
import React from 'react'
import serialize from 'serialize-javascript'
import Nav from '../../../universal/components/navigation'
import AppShell from '../../../universal/components/app-shell'
import ErrorPage from '../../../universal/routes/noMatch'
import {IS_PROD} from '../../../helpers/constants'

export default function Error(error) {
    return (
        <React.Fragment>
            <div className="main">
                <Nav />
                <AppShell>
                    <ErrorPage status={500} />
                </AppShell>
            </div>
            {!IS_PROD && (
                <div style={{overflow: 'auto'}}>
                    <pre>{serialize(error, {space: 8, isJSON: true})}</pre>
                </div>
            )}
        </React.Fragment>
    )
}
