import React from 'react'
import {Helmet} from 'react-helmet'

import Offers from '../components/offers'

import WinkelAPIClient from '../../data/api/client'
import AppCache from '../cache'

export default function OffersRoute(props) {
    return (
        <div>
            <Helmet>
                <title>Winkel - Order Management - Offers</title>
                <meta property="og:title" content="Winkel - Order Management" />
            </Helmet>
            <div className="home-content">
                <Offers products={props.products} />
            </div>
        </div>
    )
}

OffersRoute.getProps = async ({request, response, params, location}) => {
    const products = await AppCache.getFromCache('products')
    if (products) {
        return {
            products: products.cached.products
        }
    }
    const getProducts = await WinkelAPIClient.getProducts()
    AppCache.addItemToCache('products', getProducts)
    return {
        products: getProducts.products
    }
}
