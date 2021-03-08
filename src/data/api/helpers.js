export class HTTPError extends Error {
    constructor(status, message, ...params) {
        super(...params)
        this.status = status
        this.message = message
    }

    toString() {
        return `HTTPError ${this.status}: ${this.message}`
    }
}

// On the server use keep alives: https://nodejs.org/api/http.html#http_new_agent_options
export let agent
if (typeof window === 'undefined') {
    const httpAgent = new require('http').Agent({keepAlive: true})
    const httpsAgent = new require('http').Agent({keepAlive: true})
    agent = (url) => (url.protocol === 'http:' ? httpAgent : httpsAgent)
}
