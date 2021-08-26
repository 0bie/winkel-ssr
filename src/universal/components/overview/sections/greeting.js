import React from 'react'
import {displayGreeting} from '../../../helpers'

export default function Greeting({name}) {
    return (
        <React.Fragment>
            {!name && <div className="title--panel placeholder-text" />}
            {name && <h1 className="title--panel">{displayGreeting(name)}</h1>}
        </React.Fragment>
    )
}
