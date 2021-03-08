import React from 'react'
import {Button} from '@0bie/pattern-lib-react'
import {getClassName} from '../../helpers'

export default function Sidebar({children, title, isOpen, handleToggle}) {
    return (
        <div className={`sidebar-container ${getClassName(isOpen)}`}>
            <div className="sidebar">
                <header className="sidebar-header">
                    <h3 className="sidebar-title">{title}</h3>
                    <div className="sidebar-action">
                        <Button
                            size="xs"
                            classNames={['btn--link']}
                            icon={{
                                id: 'x1',
                                size: 'sm',
                                title: 'close sidebar'
                            }}
                            onClick={handleToggle}
                        />
                    </div>
                </header>
                <section className="sidebar-content">{children}</section>
            </div>
            <div className="sidebar-overlay" />
        </div>
    )
}
