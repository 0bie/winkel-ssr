import React from 'react'
import {Helmet} from 'react-helmet'

import Contacts from '../components/contacts'

import WinkelAPIClient from '../../data/api/client'
import AppCache from '../cache'

export default function ContactsRoute(props) {
    return (
        <div>
            <Helmet>
                <title>Winkel - Order Management - Contacts</title>
                <meta property="og:title" content="Winkel - Order Management" />
            </Helmet>
            <div className="home-content">
                <Contacts data={props.contacts} />
            </div>
        </div>
    )
}

ContactsRoute.getProps = async ({request, response, params, location}) => {
    if (response) {
        const cacheTime = 60 * 10 // 10m
        response.set('Cache-control', `public, max-age=${cacheTime} `)
    }
    const contacts = await AppCache.getFromCache('contacts')
    if (contacts) {
        return {
            contacts: contacts.cached.contacts
        }
    }
    const getContacts = await WinkelAPIClient.getContacts()
    AppCache.addItemToCache('contacts', getContacts)
    return {
        contacts: getContacts.contacts
    }
}
