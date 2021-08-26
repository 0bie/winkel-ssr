import React from 'react'
import {Button} from '@0bie/pattern-lib-react'
import {formatNumber, parseDate} from '../../helpers'

export default function ProductItem({
    name,
    image,
    supplier,
    price,
    quantity,
    units,
    saleBy,
    handler
}) {
    return (
        <li className="cardlist-item">
            <div className="cardlist-media">
                <figure className="image-container">
                    <img src={image.src} alt={name} loading="lazy" />
                </figure>
            </div>
            <div className="cardlist-content">
                <header className="cardlist-header">
                    <h2 className="cardlist-title">{name}</h2>
                    {supplier && (
                        <div className="cardlist-meta">{supplier}</div>
                    )}
                </header>
                {supplier && (
                    <div className="cardlist-footer">
                        <ul className="meta-list">
                            <li className="meta-item">
                                <h2 className="meta-price">
                                    <span className="meta-value">
                                        {formatNumber(price)}
                                    </span>
                                    <span className="meta-unit">CAD</span>
                                </h2>
                                <div className="meta-source">{quantity}</div>
                            </li>
                            <li className="meta-item">
                                <h2 className="meta-date">
                                    <span
                                        className="meta-duration"
                                        title={`offer expires in ${parseDate({
                                            date: saleBy,
                                        })}`}
                                    >
                                        {parseDate({date: saleBy})}
                                    </span>
                                    <span className="meta-notice">
                                        {units} units
                                    </span>
                                </h2>
                            </li>
                        </ul>
                    </div>
                )}
                {handler && (
                    <div className="cardlist-actions">
                        <Button
                            size="xs"
                            label="request order"
                            classNames={['btn--primary']}
                            onClick={handler}
                        />
                    </div>
                )}
            </div>
        </li>
    )
}
