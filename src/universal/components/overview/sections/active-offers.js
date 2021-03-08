import React, {Fragment} from 'react'
import ProductList from '../../product/list'
import ProductPlaceholder from '../../../components/placeholder'

export default function Offer({title, products}) {
    return (
        <Fragment>
            {title && (
                <h4 className="overview-title">
                    <span className="title-text">{title}</span>
                </h4>
            )}
            <div className="overview-offers">
                {!products && <ProductPlaceholder />}
                {products && <ProductList items={products} />}
            </div>
        </Fragment>
    )
}
