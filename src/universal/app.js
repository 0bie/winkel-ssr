import React, {Component} from 'react'
import {Route, Switch} from 'react-router-dom'
import AppShell from './components/app-shell'
import Nav from './components/navigation'
import AppProvider from './context/provider'
import ErrorBoundary from './boundary/error'

export default class App extends Component {
    render() {
        const {routes} = this.props
        return (
            <AppProvider>
                <Nav />
                <ErrorBoundary>
                    <Switch>
                        {routes.map(({component: Component, ...props}, i) => (
                            <Route key={i} {...props}>
                                <AppShell>
                                    <Component />
                                </AppShell>
                            </Route>
                        ))}
                    </Switch>
                </ErrorBoundary>
            </AppProvider>
        )
    }
}
