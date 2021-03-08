import React from 'react'
import {hydrate} from 'react-dom'
import {loadableReady} from '@loadable/component'
import {BrowserRouter as Router} from 'react-router-dom'
import {registerServiceWorker} from '../../worker'

import App from '../universal/app'
import {getRoutes} from '../universal/routes/main'
import {markHydrateStart, markHydrateEnd, observeLongTasks} from '../helpers/performance'

// observeLongTasks()
const routes = getRoutes()
markHydrateStart()

const hydratePWA = () => {
    return Promise.resolve()
        .then(() => new Promise((resolve) => loadableReady(resolve)))
        .then(() => {
            hydrate(
                <Router>
                    <App data={window.__INITIAL_DATA__} routes={routes} />
                </Router>,
                document.getElementById('root'),
                markHydrateEnd
            )
        })
}

const main = () => {
    return Promise.all([
        hydratePWA(),
        registerServiceWorker('/sw.js')
    ])
}
main()
