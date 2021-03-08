import React from 'react'
import {displayGreeting} from '../../../helpers'

export default function Greeting({name}) {
    return (
        <React.Fragment>
            {!name && <div className="title--panel placeholder-text" />}
            {name && <h3 className="title--panel">{displayGreeting(name)}</h3>}
        </React.Fragment>
    )
}
