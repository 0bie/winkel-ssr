import React from 'react'
import Helmet from 'react-helmet'

import Head from './head'
import {getSvgSprite} from './helpers'

const helmet = Helmet.renderStatic()
const bodyAttrs = helmet.bodyAttributes.toComponent()
const documentAttrs = helmet.htmlAttributes.toComponent()

export default function Document({appHtml, scripts=[], styles}) {
    return (
        <html lang="en-US" {...documentAttrs}>
            <Head styles={styles} />
            <body {...bodyAttrs}>
                <div
                    id="root"
                    dangerouslySetInnerHTML={{__html: appHtml}}
                />
                <div
                    aria-hidden="true"
                    className="svg-sprite"
                    dangerouslySetInnerHTML={{__html: getSvgSprite()}}
                />
                {scripts.map((script) => script)}
            </body>
        </html>
    )
}
