import React from 'react'
import {Helmet} from 'react-helmet'

import Settings from '../components/settings'

export default function SettingsRoute() {
    return (
        <div>
            <Helmet>
                <title>Winkel - Order Management - Settings</title>
                <meta property="og:title" content="Winkel - Order Management" />
            </Helmet>
            <div className="home-content">
                <Settings />
            </div>
        </div>
    )
}
