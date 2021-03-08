// HTTP
export const ORIGIN = 'http://localhost:3000'
export const INLINE_NONCE = typeof window == 'undefined' && require('crypto').randomBytes(16).toString('base64')
export const CSP_DIRECTIVES = `default-src 'self'; font-src 'self'; img-src 'self' data:; script-src 'self' 'nonce-${INLINE_NONCE}' '${process.env.NODE_ENV !== 'PRODUCTION' ? 'unsafe-eval' : ''}'; style-src 'self' 'unsafe-inline'; frame-src 'self'`

// Performance
export const SUPPORTS_PERFORMANCE = typeof performance !== 'undefined'
export const SUPPORTS_PERFORMANCE_USER_TIMING =
    SUPPORTS_PERFORMANCE &&
    typeof performance.mark == 'function' &&
    typeof performance.measure == 'function'

// SEO - Helmet
const HEAD_ELEMENTS = {
    BASE: "base",
    BODY: "body",
    HEAD: "head",
    HTML: "html",
    LINK: "link",
    META: "meta",
    NOSCRIPT: "noscript",
    SCRIPT: "script",
    STYLE: "style",
    TITLE: "title"
}

export const HELMET_HEAD_ELEMENTS = Object.keys(HEAD_ELEMENTS).map(
    (name) => HEAD_ELEMENTS[name]
)

// Debug
export const IS_PROD = process.env.NODE_ENV == 'production'
export const IS_PREVIEW = (request) => 'ssr_preview' in request.query

// Sentry
export const SENTRY_DSN_CLIENT = 'https://57c798d4de764dba847fc946852ed0c6@o331146.ingest.sentry.io/5279497'
