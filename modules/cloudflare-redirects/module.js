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

const OUTPUT_DIR = path.join(__dirname, '../../dist');
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
    const apiRedirects = data.redirects
      .map(el => ({
        from: `^${el.origin}$`,
        to: el.target,
        statusCode: el.type || el.statusCode || 301,
        _source: 'api'
      }))
      .filter(({ from, to, statusCode }) => Boolean(from) && Boolean(to) && Boolean(statusCode))

    return { redirects: apiRedirects }
  } catch (e){
    console.warn('[redirects] Failed to fetch API redirects:', e.message)
    return { redirects: [], error: e.message }
  }
}

async function buildRedirects() {
  // Merge API (if available)
  const { redirects: apiRedirects } = await fetchApiRedirects()
  // Deduplicate by 'from' preferring API over local (assume API is authoritative)
  const map = new Map()
  for(const r of apiRedirects){
    map.set(r.from, r)
  }
  return Array.from(map.values())
}

module.exports = async function module() {
  const nuxtInstance = this
  nuxtInstance.nuxt.hook('generate:done', async () => {

    console.info('Cloudflare redirect generation...');

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

    console.info(`[redirects] Total rules (local + api): ${allRedirects.length}`)
    console.info(`[redirects] Written ${lines.length} simple redirects to ${OUTPUT_FILE}`)

    if(skippedComplex) {
      console.info(`[redirects] Skipped ${skippedComplex} complex patterns (add manually to _redirects if needed).`)
    }
  });
}

module.exports.meta = require('./package.json')