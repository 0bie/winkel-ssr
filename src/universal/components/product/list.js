import React from 'react'

import ProductItem from './item'
import ProductPlaceholder from '../placeholder'
import OrderProductForm from '../offers/form/order'

export default function ProductList({items, handleOrder}) {
    return (
        <React.Fragment>
            {renderEmptyList(items)}
            <ul className="cardlist">
                {items &&
                    items.map((item) => (
                        <ProductItem
                            {...item}
                            key={item.id}
                            handler={
                                handleOrder &&
                                handleOrder.bind(null, {
                                    children: <OrderProductForm product={item} />,
                                    title: `Order ${item.name}`,
                                })
                            }
                        />
                    ))}
            </ul>
        </React.Fragment>
    )
}

function renderEmptyList(items) {
    if (!items || !items.length > 0) {
        return <ProductPlaceholder count={8} />
    }
}
