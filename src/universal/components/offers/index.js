import React, {Fragment, useState} from 'react'

import Sidebar from '../sidebar'
import ProductList from '../product/list'

export default function Offers({products}) {
    const [SidebarState, setSidebarState] = useState({isOpen: false})
    const handleToggle = (props) => {
        return setSidebarState({isOpen: !SidebarState.isOpen, ...props})
    }

    return (
        <Fragment>
            <header className="header--panel header--offer">
                <h1 className="title--panel">Offers</h1>
            </header>
            <div className="content--offer">
                <ProductList items={products} handleOrder={handleToggle} />
            </div>
            <Sidebar handleToggle={handleToggle} {...SidebarState} />
        </Fragment>
    )
}
