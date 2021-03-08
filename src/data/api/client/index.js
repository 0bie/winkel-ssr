import fetch from 'cross-fetch'
import {HTTPError} from '../helpers'

import {getUser, getProducts, getContacts, getCompanies} from '../../queries'
import {
    editUser,
    sendOrder,
    addContact,
    addCompany,
    editContact,
    deleteContact,
    deleteCompany,
    messageContact
} from '../../mutations'

class WinkelAPIClient {
    constructor({
        apiBaseUrl = 'http://localhost:9000',
        apiToken = process.env.API_TOKEN
    }) {
        this.token = apiToken
        this.apiBaseUrl = apiBaseUrl
    }

    async api(opts) {
        const controller = new AbortController()
        const controllerID = setTimeout(() => controller.abort(), 8000)

        const options = {
            method: 'POST',
            headers: {
                Authorization: this.token,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(opts),
            signal: controller.signal
        }

        const httpAgent = require('../helpers').agent
        if (httpAgent) options.agent = httpAgent.agent

        const response = await fetch(this.apiBaseUrl, options)
        if (!response.ok) {
            throw new HTTPError(
                response.status,
                `${response.status} - ${response.statusText}`
            )
        }
        clearTimeout(controllerID)
        const responseData = await response.json()
        return responseData.data
    }

    getUser() {
        return this.api({query: getUser})
    }

    editUser(variables) {
        return this.api({query: editUser, variables})
    }

    getContacts() {
        return this.api({query: getContacts})
    }

    addContact(variables) {
        return this.api({query: addContact, variables})
    }

    editContact(variables) {
        return this.api({query: editContact, variables})
    }

    deleteContact(variables) {
        return this.api({query: deleteContact, variables})
    }

    messageContact(variables) {
        return this.api({query: messageContact, variables})
    }

    getCompanies() {
        return this.api({query: getCompanies})
    }

    addCompany(variables) {
        return this.api({query: addCompany, variables})
    }

    deleteCompany(variables) {
        return this.api({query: deleteCompany, variables})
    }

    getProducts() {
        return this.api({query: getProducts})
    }

    sendOrder(variables) {
        return this.api({query: sendOrder, variables})
    }

    test() {
        throw new HTTPError(
            550,
            `${test} - ${error-text}`
        )
    }
}

export default new WinkelAPIClient({
    apiBaseUrl: 'http://localhost:9000',
    apiToken: process.env.API_TOKEN
})
