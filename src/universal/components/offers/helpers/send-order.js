import WinkelAPIClient from '../../../../data/api/client'

import {emptyValue, handleSubmit} from '../../../helpers'

export default async function handleOrder(fn, evt) {
    evt.preventDefault()
    const form = document.getElementById('form_order')
    if (!form) {
        throw new Error('handleOrder requires a valid form element')
    }
    const order = {}
    const orderData = new FormData(form)
    for (const [key, value] of orderData.entries()) {
        if (key === 'units') {
            order[key] = parseInt(value)
        } else {
            if (value.length > 0) {
                order[key] = value
            }
        }
    }

    const {products} = await WinkelAPIClient.getProducts()
    const {companies} = await WinkelAPIClient.getCompanies()

    const productIndex = products.findIndex((product) => {
        return product.id === order.product
    })

    const companyIndex = companies.findIndex((company) => {
        return company.name === order.company
    })

    const { id, ...productInfo } = products[productIndex]
    if (!order.id) {
        var {id: companyId, ...companyInfo} = companies[companyIndex]
    }
    const orderDetails = Object.assign({}, order, {
        id: order.id || companyId,
        input: {
            units: order.units,
            products: [productInfo],
            delivery: order.delivery
        }
    })

    if (evt.target.closest('.panel-action')) {
        if (emptyValue(orderDetails)) return
        const response = await WinkelAPIClient.sendOrder(orderDetails)
        if (!emptyValue(response.sendOrder)) {
            handleSubmit({
                duration: 5000,
                message: 'Your order has been sent.',
                handleNotice: fn
            })
            form.reset()
        } else {
            // handle error notice
        }
    }
}

