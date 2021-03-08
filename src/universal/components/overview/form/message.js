import React, {Fragment, useContext} from 'react'
import {Button, Input} from '@0bie/pattern-lib-react'

import {sortObjects} from '../../../helpers'
import {handleMessageContact, renderSelectOptions} from '../helpers'

import AppContext from '../../../context'

export default function MessageContactForm({title, contacts}) {
    const sortedContacts = contacts && contacts.length && sortObjects(contacts, 'firstName')
    const {handleNoticeToggle} = useContext(AppContext)

    return (
        <Fragment>
            <header className="panel-header">
                <h3 className="title-text">{title}</h3>
            </header>
            <form id="contact_message" className="panel-form">
                <div className="input-row">
                    <div className="panel-input mb--sm">
                        <label className="input-label">subject</label>
                        <Input
                            size="xs"
                            name="subject"
                            id="input_new_note"
                            placeholder="Message Subject"
                            classNames={['input--full']}
                        />
                    </div>
                    <div className="panel-input mb--sm">
                        <label className="input-label">contact</label>
                        <select
                            name="id"
                            className="input input--xs input--full"
                            required
                        >
                            <option value="">Choose a contact</option>
                            {contacts &&
                                contacts.length > 0 &&
                                sortedContacts.map(renderSelectOptions)}
                        </select>
                    </div>
                </div>
                <div className="panel-input mb--xs">
                    <Input
                        rows="6"
                        cols="20"
                        size="xs"
                        name="text"
                        type="textField"
                        classNames={['input--full']}
                        inputClassNames={['input--note']}
                        placeholder="Compose a new message..."
                    />
                </div>
                <div className="panel-action">
                    <Button
                        size="xs"
                        label="send message"
                        onClick={handleMessageContact.bind(null, handleNoticeToggle)}
                        classNames={['btn--primary', 'btn--raised']}
                    />
                </div>
            </form>
        </Fragment>
    )
}
