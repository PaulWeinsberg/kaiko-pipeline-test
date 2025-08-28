#!/usr/bin/env node
/**
 * Generate Cloudflare Pages compatible _redirects file from static redirect lists.
 * Cloudflare format: <source> <destination> [status]
 * We convert regex-like from patterns (starting with ^ and ending with $) to simple paths when possible.
 * Complex regex are skipped with a warning (user can add manual rules).
 */
const fs = require('fs')
const path = require('path')

const { redirectGenerator } = require('../redirects')

const OUTPUT_DIR = path.join(process.cwd(), 'dist')
const OUTPUT_FILE = path.join(OUTPUT_DIR, '_redirects')

function simplify(pattern){
  // Only handle ^/path$ simple patterns
  const m = pattern.match(/^\^([^$?*+()\\[\]]+)\$/)
  if(!m) return null
  return m[1]
}

function main(){
  if(!fs.existsSync(OUTPUT_DIR)){
    console.error('dist directory not found. Run `npm run generate` first.')
    process.exit(1)
  }
  const lines = []
  for(const r of redirectGenerator){
    const simple = simplify(r.from)
    if(!simple){
      console.warn('Skipping complex redirect pattern (add manually in _redirects if needed):', r.from)
      continue
    }
    const status = r.statusCode || 301
    lines.push(`${simple} ${r.to} ${status}`)
  }
  fs.writeFileSync(OUTPUT_FILE, lines.join('\n'), 'utf8')
  console.log(`Generated ${lines.length} redirects in ${OUTPUT_FILE}`)
}

main()
