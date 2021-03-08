import React from 'react'
import {Helmet} from 'react-helmet'

import Overview from '../components/overview'

import WinkelAPIClient from '../../data/api/client'
import AppCache from '../cache'

export default function Home(props) {
    return (
        <div>
            <Helmet>
                <title>Winkel - Order Management</title>
                <meta property="og:title" content="Winkel - Order Management" />
            </Helmet>
            <div className="home-content">
                <Overview
                    products={props.products}
                    contacts={props.contacts}
                    companies={props.companies}
                />
            </div>
        </div>
    )
}

Home.getProps = async ({request, response, params, location}) => {
    const products = await AppCache.getFromCache('products')
    const contacts = await AppCache.getFromCache('contacts')
    const companies = await AppCache.getFromCache('companies')

    if (products && contacts && companies) {
        return {
            products: products.cached.products,
            contacts: contacts.cached.contacts,
            companies: companies.cached.companies,
        }
    }

    const getProducts = WinkelAPIClient.getProducts()
    const getContacts = WinkelAPIClient.getContacts()
    const getCompanies = WinkelAPIClient.getCompanies()
    const [
        productsResponse,
        contactsResponse,
        companiesResponse,
    ] = await Promise.all([getProducts, getContacts, getCompanies])

    AppCache.addItemToCache('products', productsResponse)
    AppCache.addItemToCache('contacts', contactsResponse)
    AppCache.addItemToCache('companies', companiesResponse)

    return {
        products: productsResponse.products,
        contacts: contactsResponse.contacts,
        companies: companiesResponse.companies,
    }
}
