let caseOne = []
try {
	// eslint-disable-next-line global-require, import/no-unresolved
	caseOne = require('./list/caseOne').default || require('./list/caseOne') || []
} catch (e) {
	// Silently ignore if file not present (static builds without redirect list)
	caseOne = []
}
export const redirectGenerator = [...caseOne]
