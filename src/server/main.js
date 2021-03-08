import fs from 'fs'
import path from 'path'
import https from 'https'
import cors from 'cors'
import express from 'express'
import favicon from 'serve-favicon'
import {matchPath} from 'react-router-dom'

import {render} from './render'
import {getRoutes} from '../universal'
import {ORIGIN, CSP_DIRECTIVES} from '../helpers/constants'

const app = express()

app.disable('x-powered-by')

app.use(cors({
    origin: ORIGIN
}))

app.use(express.json({
    strict: true
}))

app.use(express.urlencoded({
    extended: true
}))

app.use(express.static(path.join(process.cwd(), 'public')))
app.use(favicon(path.join(process.cwd(), 'public', 'favicon.ico')))

app.use((_, response, next) => {
    response.setHeader(
        'Content-Security-Policy',
        CSP_DIRECTIVES
    )
    next()
})

app.use((request, response, next) => {
    const cacheTime = 60 * 5 // 5m
    if (request.method == 'GET') {
        response.set('Cache-control', `public, max-age=${cacheTime} `)
    } else {
        response.set('Cache-control', 'no store')
    }
    next()
})

app.get('*', async (request, response) => {
    let match
    const routes = getRoutes()
    const currentRoute =
        routes.find((route) => {
            match = matchPath(request.path, route)
            return match
        }) || {}
    const {params, url} = match || {}
    const getRouteData = () =>
        currentRoute.component && currentRoute.component.getProps
            ? currentRoute.component.getProps({
                  request,
                  response,
                  params,
                  location: url
              })
            : Promise.resolve({})
    await render(request, response, routes, getRouteData)
})

// https.createServer({
//     key: fs.readFileSync(path.resolve('src/server/certs', 'localhost.key')),
//     cert: fs.readFileSync(path.resolve('src/server/certs', 'localhost.crt'))
// }, app).listen(3000, (err) => {
//     if (err) console.error(err)
//     console.log(`🚀 App server listening on ${ORIGIN}`)
// })
app.listen(3000, (err) => {
    if (err) console.error(err)
    console.log(`🚀 App server listening on ${ORIGIN}`)
})
