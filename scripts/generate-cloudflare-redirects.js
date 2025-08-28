#!/usr/bin/env node
/**
 * Generate Cloudflare Pages compatible _redirects file combining:
 * 1. Local static redirect lists (./redirects/*)
 * 2. Remote API redirects (GET <API_URL>/redirects) when API_URL & API_KEY are present
 *
 * Cloudflare format: <source> <destination> [status]
 * We attempt to simplify simple anchored regex patterns (^/path$) into literal paths.
 * Complex/parameterised regex are skipped with a warning so they can be added manually if required.
 */
const fs = require('fs')
const path = require('path')
const axios = require('axios')

const { redirectGenerator } = require('../redirects')

const OUTPUT_DIR = path.join(process.cwd(), 'dist')
const OUTPUT_FILE = path.join(OUTPUT_DIR, '_redirects')

function simplify(pattern){
  // Only handle ^/simple/path$ patterns (no groups, quantifiers or special chars)
  const m = pattern.match(/^\^([^$?*+()\\[\]]+)\$/)
  if(!m) return null
  return m[1]
}

async function fetchApiRedirects(){
  const { API_URL, API_KEY } = process.env
  if(!API_URL || !API_KEY){
    return { redirects: [], skipped: 'Missing API_URL or API_KEY' }
  }
  try {
    const client = axios.create({
      baseURL: API_URL.replace(/\/$/, ''),
      headers: { 'X-Auth-Token': API_KEY, Accept: 'application/json, text/plain, */*' }
    })
    const { data } = await client.get('redirects')
    if(!data || !Array.isArray(data.redirects)){
      console.warn('[redirects] Unexpected API response shape, expected { redirects: [...] }')
      return { redirects: [] }
    }
    const apiRedirects = data.redirects.map(el => ({
      from: `^${el.origin}$`,
      to: el.target,
      statusCode: el.type || el.statusCode || 301,
      _source: 'api'
    }))
    return { redirects: apiRedirects }
  } catch (e){
    console.warn('[redirects] Failed to fetch API redirects:', e.message)
    return { redirects: [], error: e.message }
  }
}

async function buildRedirects(){
  // Start with local
  const local = redirectGenerator.map(r => ({ ...r, _source: 'local' }))
  // Merge API (if available)
  const { redirects: apiRedirects } = await fetchApiRedirects()
  // Deduplicate by 'from' preferring API over local (assume API is authoritative)
  const map = new Map()
  for(const r of local){
    map.set(r.from, r)
  }
  for(const r of apiRedirects){
    map.set(r.from, r)
  }
  return Array.from(map.values())
}

async function main(){
  if(!fs.existsSync(OUTPUT_DIR)){
    console.error('dist directory not found. Run `npm run generate` first.')
    process.exit(1)
  }

  const allRedirects = await buildRedirects()
  const lines = []
  let skippedComplex = 0
  for(const r of allRedirects){
    const simple = simplify(r.from)
    if(!simple){
      skippedComplex++
      continue
    }
    const status = r.statusCode || 301
    lines.push(`${simple} ${r.to} ${status}`)
  }
  fs.writeFileSync(OUTPUT_FILE, lines.join('\n'), 'utf8')
  console.log(`[redirects] Total rules (local + api): ${allRedirects.length}`)
  console.log(`[redirects] Written ${lines.length} simple redirects to ${OUTPUT_FILE}`)
  if(skippedComplex){
    console.log(`[redirects] Skipped ${skippedComplex} complex patterns (add manually to _redirects if needed).`)
  }
}

main().catch(err => {
  console.error('Redirect generation failed:', err)
  process.exit(1)
})
