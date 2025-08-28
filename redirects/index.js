// This module is consumed in two contexts:
// 1. At build / generation time & redirect generation script (Node environment) -> can use fs
// 2. Imported indirectly by middleware in dev/server mode. Avoid bundling 'fs' into client build.

let redirectGenerator = []

if (typeof process !== 'undefined' && process.release && process.release.name === 'node') {
	try {
		// eslint-disable-next-line global-require, import/no-unresolved
		const mod = require('./list/caseOne')
		redirectGenerator = Array.isArray(mod?.default) ? mod.default : (Array.isArray(mod) ? mod : [])
	} catch (e) {
		try {
			// Lazy require only when available to avoid webpack trying to polyfill
			const fs = require('fs')
			const path = require('path')
			const filePath = path.join(__dirname, 'list', 'caseOne.js')
			if (fs.existsSync(filePath)) {
				const content = fs.readFileSync(filePath, 'utf8')
				const match = content.match(/const caseOne = (\[.*\]);export default/)
				if (match) redirectGenerator = JSON.parse(match[1])
			}
		} catch (_) {
			redirectGenerator = []
		}
	}
}

module.exports = { redirectGenerator }
