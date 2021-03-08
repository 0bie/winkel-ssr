import React, {Fragment} from 'react'

import AddContactForm from '../form/add'
import MessageContactForm from '../form/message'

export default function QuickActions({title, contacts}) {
    return (
        <Fragment>
            {title && (
                <h4 className="overview-title">
                    <span className="title-text">{title}</span>
                </h4>
            )}
            <div className="overview-actions">
                <ul className="overview-panel">
                    <li className="panel-item">
                        <MessageContactForm
                            title="new message"
                            contacts={contacts}
                        />
                    </li>
                    <li className="panel-item">
                        <AddContactForm title="new contact" />
                    </li>
                </ul>
            </div>
        </Fragment>
    )
}
