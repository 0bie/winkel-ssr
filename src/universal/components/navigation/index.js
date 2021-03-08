import React, {useContext} from 'react'
import {Avatar, Button} from '@0bie/pattern-lib-react'
import Logo from '../logo'

import AppContext from '../../context'

export default function Navigation() {
    const {state, handleNavToggle} = useContext(AppContext)
    return (
        <nav className="navigation-container">
            <Logo logoText="winkel" />
            <ul className="navigation">
                {state.user && (
                    <li className="navigation-item">
                        <Avatar
                            size="sm"
                            user={state.user}
                            classNames={['mr--xs', 'vert--mid']}
                        />
                    </li>
                )}
                <li className="navigation-item">
                    <a href="#">sign out</a>
                </li>
                <li className="navigation-item">
                    <Button
                        size="sm"
                        tabIndex="0"
                        onClick={handleNavToggle}
                        classNames={['btn--menu']}
                    >
                        <div className="icon icon--menu vert--mid">
                            <span className="bar" />
                        </div>
                    </Button>
                </li>
            </ul>
        </nav>
    )
}
