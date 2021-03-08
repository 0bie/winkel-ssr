import React, {useContext} from 'react';
import {
    Offers,
    Greeting,
    Statistics,
    QuickActions
} from './sections'

import AppContext from '../../context'

export default function Overview({products, companies, contacts}) {
    const {state} = useContext(AppContext)
    const activeOffers = products && [...products].splice(0, 4)
    return (
        <div className="overview">
            <header className="header--panel">
                <Greeting name={state.user.firstName} />
            </header>
            <Statistics products={products} companies={companies} contacts={contacts} />
            <Offers title="active offers" products={activeOffers} />
            <QuickActions title="quick actions" contacts={contacts} />
        </div>
    )
}
