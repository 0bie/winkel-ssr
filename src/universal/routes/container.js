// global __isBrowser__

import React from 'react'
import {withRouter} from 'react-router-dom'

import {
    markRouteChange,
    markGetPropsStart,
    markGetPropsEnd,
} from '../../helpers/performance'

export const routeContainer = (Component) => {
    class RouteContainer extends React.Component {
        constructor(props) {
            super(props)
            if (__isBrowser__) {
                this.routeProps = window.__INITIAL_DATA__
                delete window.__INITIAL_DATA__
            } else {
                this.routeProps = this.props.staticContext.data
            }
            this.state = {routeProps: this.routeProps}
        }

        routeProps = null

        static async getComponent() {
            return Component.load
                ? Component.load().then((module) => module.default)
                : Promise.resolve(Component)
        }

        static async getProps(args) {
            const component = await RouteContainer.getComponent()
            return component.getProps
                ? component.getProps({...args})
                : Promise.resolve()
        }

        static async shouldGetProps(args) {
            const defaultImpl = () => {
                const {previousLocation, location} = args
                return (
                    !previousLocation ||
                    previousLocation.pathname !== location.pathname
                )
            }
            const component = await RouteContainer.getComponent()
            return component.shouldGetProps
                ? component.shouldGetProps(args)
                : defaultImpl()
        }

        getProps = async () => {
            const component = await RouteContainer.getComponent()
            if (!component.getProps) return
            const {url, params} = this.props.match
            const args = {
                request: undefined,
                response: undefined,
                params,
                location: url
            }
            markGetPropsStart()
            const routeProps = await RouteContainer.getProps(args)
            this.setState(
                () => ({
                    routeProps,
                }),
                markGetPropsEnd
            )
        }

        componentDidMount() {
            markRouteChange()
            if (!this.state.routeProps) {
                this.getProps()
            }
        }

        async componentDidUpdate(previousProps) {
            const {
                location: previousLocation,
                match: previousMatch,
            } = previousProps
            const {location, match} = this.props
            const {params} = match || {}
            const {params: previousParams} = previousMatch || {}
            const shouldGetProps = await RouteContainer.shouldGetProps({
                previousLocation,
                location,
                previousParams,
                params
            })
            if (!this.state.routeProps || shouldGetProps) {
                this.getProps()
            }
        }

        render() {
            return <Component {...this.state.routeProps} {...this.props} />
        }
    }

    const componentName = Component.displayName || Component.name
    RouteContainer.displayName = `routeContainer(${componentName})`
    return withRouter(RouteContainer)
}
