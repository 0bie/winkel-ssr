import React from 'react'

export default function MainPanel({title, children}) {
    return (
        <main className="panel panel--main">
            <div className="panel-content">
                {title && <h1 className="panel-title">{title}</h1>}
                {children}
            </div>
        </main>
    )
}
