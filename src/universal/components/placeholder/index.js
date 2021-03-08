import React from 'react'
import PlaceholderItem from './item'

export default function ProductItemPlaceholder({count = 4}) {
    return (
        <ul className="cardlist">
            {[...new Array(count)].map((_, index) => (
                <PlaceholderItem key={index} />
            ))}
        </ul>
    )
}
