import loadable from '@loadable/component'
import {routeContainer} from './container'

const Home = loadable(() => import('./home'))
const Contacts = loadable(() => import('./contacts'))
const Companies = loadable(() => import('./companies'))
const Offers = loadable(() => import('./offers'))
const Settings = loadable(() => import('./settings'))
const Test500Error = loadable(() => import('./test'))
const NoMatch = loadable(() => import('./noMatch'))

const routes = [
    {
        path: '/',
        exact: true,
        component: Home
    },
    {
        path: '/contacts',
        exact: true,
        component: Contacts
    },
    {
        path: '/companies',
        exact: true,
        component: Companies
    },
    {
        path: '/offers',
        exact: true,
        component: Offers
    },
    {
        path: '/settings',
        exact: true,
        component: Settings
    },
    {
        path: '/test-500-error',
        component: Test500Error
    }
]

export const getRoutes = () => {
    const allRoutes = [...routes, {path: '*', component: NoMatch}]
    return allRoutes.map(({component, ...rest}) => {
        return {
            component: component ? routeContainer(component) : component,
            ...rest
        }
    })
}

export default routes
