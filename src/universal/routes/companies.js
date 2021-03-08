import React from 'react'
import {Helmet} from 'react-helmet'

import Companies from '../components/companies'

import WinkelAPIClient from '../../data/api/client'
import AppCache from '../cache'

export default function CompaniesRoute(props) {
    return (
        <div>
            <Helmet>
                <title>Winkel - Order Management - Companies</title>
                <meta property="og:title" content="Winkel - Order Management" />
            </Helmet>
            <div className="home-content">
                <Companies data={props.companies} />
            </div>
        </div>
    )
}

CompaniesRoute.getProps = async ({request, response, params, location}) => {
    if (response) {
        const cacheTime = 60 * 10 // 10m
        response.set('Cache-control', `public, max-age=${cacheTime} `)
    }
    const companies = await AppCache.getFromCache('companies')
    if (companies) {
        return {
            companies: companies.cached.companies
        }
    }
    const getCompanies = await WinkelAPIClient.getCompanies()
    AppCache.addItemToCache('companies', getCompanies)
    return {
        companies: getCompanies.companies
    }
}
