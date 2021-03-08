import React from 'react'
import Helmet from 'react-helmet'
import {HELMET_HEAD_ELEMENTS} from '../../helpers/constants'

const helmet = Helmet.renderStatic()
const helmetElements = HELMET_HEAD_ELEMENTS.map(
    (element) => helmet[element] && helmet[element].toComponent()
).filter((element) => element)

export default function Head({styles = []}) {
    return (
        <head>
            {styles.map((style) => style)}
            <meta name="charset" content="utf-8" />
            <meta name="theme-color" content="#26292b" />
            <meta name="apple-mobile-web-app-title" content="Winkel - Order Management" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <meta name="format-detection" content="telephone=no" />
            <meta name="description" content="Winkel - Order Management" />
            <link rel="icon" href="/ico/favicon.ico" />
            <link rel="manifest" href="/manifest.json" />
            <link rel="apple-touch-icon" href="/ico/apple-touch-icon.png" />
            {[...helmetElements]}
        </head>
    )
}
