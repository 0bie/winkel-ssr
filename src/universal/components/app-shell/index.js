import React from 'react'
import {MainPanel, MenuPanel} from '../panels'

import {menuData} from '../../../data'

export default function AppShell({children}) {
    return (
        <div className="route-container">
            <MenuPanel items={menuData} />
            <MainPanel>{children}</MainPanel>
        </div>
    )
}
