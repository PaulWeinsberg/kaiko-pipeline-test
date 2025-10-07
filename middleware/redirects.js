import axios from 'axios';

/**
 * @typedef {Object} RedirectRule
 * @property {string} from - Regular expression pattern for the source path
 * @property {string} to - Target URL for the redirect
 * @property {number|undefined} statusCode - HTTP status code for the redirect
 */

/**
 * @typedef {Object} RedirectData
 * @property {string} origin - Source path pattern
 * @property {string} target - Target URL
 * @property {number} type - HTTP status code
 */

const createAxios = axios.create({
  headers: {
      common: {
          Accept: 'application/json, text/plain, */*',
          'X-Auth-Token': process.env.API_KEY,
      },
  },
  credentials: false,
  withCredentials: false,
  baseURL: process.env.API_URL,
})

// Cache implementation
/** @type {RedirectRule[] | null} */
let cachedRedirects = null;
/** @type {number | null} */
let cacheTimestamp = null;
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes in milliseconds

/**
 * Middleware function to handle redirects
 * @param {import('http').ServerRequest} req - Incoming request
 * @param {import('http').ServerResponse} res - Response object
 * @param {Function} next - Next middleware function
 * @returns {Promise<void>}
 */
export default async function (req, res, next) {
  try {
    // Check if cache is valid
    const now = Date.now();
    if (!cachedRedirects || !cacheTimestamp || now - cacheTimestamp > CACHE_DURATION) {
      // Fetch fresh data
      const { data } = await createAxios.get('redirects');
      const apiRedirects = data.redirects.map(el => ({
        from: `^${el.origin}$`,
        to: el.target,
        statusCode: el.type
      }));
      cachedRedirects = [...apiRedirects];
      cacheTimestamp = now;
    }

    const path = req._parsedUrl.pathname;
    /** @type {RedirectRule | undefined} */
    const matchedRedirect = cachedRedirects.find(redirect => new RegExp(redirect.from).test(path));

    if (matchedRedirect) {
      res.writeHead(matchedRedirect.statusCode ?? 301, { Location: matchedRedirect.to });
      res.end();
      // Keep return to avoid further processing if redirect is found
      return;
    }

  } catch (err) {
    console.error('Error when trying to get redirects from API', err);
  }

  next();
}