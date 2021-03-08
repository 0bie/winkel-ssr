import React, {useContext} from 'react'
import {NavLink} from 'react-router-dom'
import {Icon} from '@0bie/pattern-lib-react'
import {getClassName} from '../../helpers'

import AppContext from '../../context'

export default function MenuPanel({items, handleToggle}) {
    const context = useContext(AppContext)
    const {isOpen} = context.state.navigation
    return (
        <aside className={`drawer ${getClassName(isOpen)}`}>
            <div className="drawer-overlay" onClick={handleToggle} />
            <nav className="panel panel--menu">
                <ul>
                    {items.map((item) => (
                        <li key={item.id} className="panel-item">
                            <NavLink exact to={item.link}>
                                <Icon
                                    size="sm"
                                    id={item.icon}
                                    classNames={['vert--mid', 'mr--sm']}
                                />
                                <span className="panel-text">{item.title}</span>
                            </NavLink>
                        </li>
                    ))}
                </ul>
            </nav>
        </aside>
    )
}
