import path from 'path'
import React from 'react'
import serialize from 'serialize-javascript'
import {renderToString} from 'react-dom/server'
import {StaticRouter as Router} from 'react-router-dom'
import {ChunkExtractor} from '@loadable/server'

import Error from './components/error'
import {App, Document} from '../universal'
import {IS_PREVIEW, INLINE_NONCE} from '../helpers/constants'

const statsFile = path.resolve(process.cwd(), 'public/loadable-stats.json')
const extractor = new ChunkExtractor({statsFile})

export const render = async (request, response, routes, dataHandler) => {
    try {
        const data = await dataHandler()
        const appHTML = renderToString(
            extractor.collectChunks(
                <Router location={request.url} context={{data}}>
                    <App data={data} routes={routes} />
                </Router>
            )
        )

        const previewProps = IS_PREVIEW(request)
            ? {type: 'application/json'}
            : {}
        const scriptTags = extractor.getScriptElements().map((el) =>
            React.cloneElement(el, {
                ...el.props,
                ...previewProps
            })
        )
        const styles = extractor.getStyleElements()
        const scripts = [
            <script
                key="data"
                nonce={INLINE_NONCE}
                dangerouslySetInnerHTML={{
                    __html: `window.__INITIAL_DATA__ = ${serialize(
                        data,
                        {
                            isJSON: true,
                            space: IS_PREVIEW(request) ? 8 : 0
                        }
                    )}`
                }}
            />,
            ...scriptTags
        ]
        const docHTML = renderToString(
            <Document appHtml={appHTML} scripts={scripts} styles={styles} />
        )
        response.send(`<!doctype html>${docHTML}`)
    } catch (error) {
        console.error('ERROR: ', error)
        renderError(request, response, error)
    }
}

const renderError = (request, response, error) => {
    const errorObj = {
        stack: error.stack,
        status: error.status,
        message: error.message,
    }
    const errorComponent = renderToString(
        extractor.collectChunks(
            <Router location={request.url}>
                <Error error={errorObj} />
            </Router>
        )
    )
    const styles = extractor.getStyleElements()
    const errorPage = renderToString(
        <Document appHtml={errorComponent} styles={styles} />
    )
    const status = error.status ? error.status : 500
    response.status(status).send(`<!doctype html>${errorPage}`)
}
