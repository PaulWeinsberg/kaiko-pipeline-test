// middleware/index.js
import Middleware from '../../middleware'

import trailingSlashRedirectModule from './modules/trailingSlashRedirect'
import sitemapModule from './modules/sitemap'

Middleware.sitemapMiddleware = sitemapModule
Middleware.trailingSlashRedirect = trailingSlashRedirectModule
