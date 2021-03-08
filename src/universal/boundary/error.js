import React from 'react'
import {Notice} from '@0bie/pattern-lib-react'
import serialize from 'serialize-javascript'

import AppShell from '../components/app-shell'
import {NOTICE_OFFLINE_PROPS} from './constants'
import {IS_PROD} from '../../helpers/constants'
import ERROR_IMAGE from '../../../public/assets/error/error.svg'

export default class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            error: null,
            online: true,
            hasError: false
        }
        this.setOnlineStatus = this.setOnlineStatus.bind(this)
    }
    static getDerivedStateFromError(error) {
        return {
            hasError: true,
            error: {
                stack: error.stack,
                message: error.toString()
            },
        }
    }
    componentDidCatch(error, errorInfo) {
        // TODO: Sentry.captureException(error)
        console.error(error, errorInfo)
    }
    componentDidMount() {
        window.addEventListener('online', (evt) =>
            this.setOnlineStatus(true, evt)
        )
        window.addEventListener('offline', (evt) =>
            this.setOnlineStatus(false, evt)
        )
    }
    componentWillUnmount() {
        window.removeEventListener('online')
        window.removeEventListener('offline')
    }
    setOnlineStatus(isOnline) {
        this.setState(() => ({online: isOnline}))
    }
    render() {
        const {error, online, hasError} = this.state
        if (hasError) {
            return (
                <AppShell>
                    <div className="p--md">
                        <div>
                            <p>Something went wrong.</p>
                            <a href="/">Go to homepage</a>
                        </div>
                        <div
                            dangerouslySetInnerHTML={{__html: ERROR_IMAGE}}
                        />
                    </div>
                    {!IS_PROD && (
                        <div style={{overflow: 'auto'}}>
                            <pre>{serialize(error, {space: 8, isJSON: true})}</pre>
                        </div>
                    )}
                </AppShell>
            )
        }
        return (
            <React.Fragment>
                {!online && <Notice {...NOTICE_OFFLINE_PROPS} />}
                {this.props.children}
            </React.Fragment>
        )
    }
}
