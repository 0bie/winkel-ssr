import React, {Fragment, useContext} from 'react'
import {Button, Input} from '@0bie/pattern-lib-react'

import ProductItem from '../../product/item'
import {parseDate} from '../../../helpers'

import {handleOrder} from '../helpers/'
import AppContext from '../../../context'

export default function OrderProductForm({product}) {
    const {handleNoticeToggle} = useContext(AppContext)
    return (
        <Fragment>
            <ul className="card-list">
                <ProductItem {...product} />
            </ul>
            <h3 className="title--panel">sold by {product.supplier}</h3>
            <span className="offer-meta">Offer ends in {parseDate({date: product.saleBy})}</span>
            <form id="form_order" className="panel-form form--order">
                <input name="product" value={product.id} type="hidden" />
                <input name="company" value={product.supplier} type="hidden" />
                <div>
                    <div className="panel-input mb--sm">
                        <label className="input-label">quantity</label>
                        <Input
                            size="xs"
                            name="units"
                            min="0"
                            max="15"
                            type="number"
                            classNames={['input--full']}
                        />
                    </div>
                    <div className="panel-input mb--sm">
                        <label className="input-label">delivery method</label>
                        <select name="delivery" className="input input--xs input--full">
                            <option value="">Choose a Delivery method</option>
                            <option value="express">Express (1 - 2 business days)</option>
                            <option value="standard">Standard (5 - 8 business days)</option>
                        </select>
                    </div>
                </div>
                <div className="panel-action">
                    <Button
                        size="xs"
                        label="place order"
                        onClick={handleOrder.bind(null, handleNoticeToggle)}
                        classNames={['btn--primary', 'btn--raised', 'btn--full']}
                    />
                </div>
            </form>
        </Fragment>
    )
}
