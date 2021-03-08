import React, {useContext} from 'react'
import {Button, Notice} from '@0bie/pattern-lib-react'

import AppContext from '../../../context'
import {handleDeleteContact} from '../helpers'

export default function DeleteContactForm({contact}) {
    const {handleNoticeToggle} = useContext(AppContext)
    const fullName = contact.firstName + ' ' + contact.lastName || ''
    return (
        <form id="contact_delete" className="panel-form">
            {contact && <input name="id" value={contact.id} type="hidden" />}
            <Notice
                state="warn"
                iconPosition="left"
                classNames={['mb--md']}
                icon={{
                    id: 'warning',
                    size: 'sm',
                    title: `delete ${fullName}`,
                }}
                message={`You're about to delete ${fullName} from contacts.`}
            />
            <div className="panel-action">
                <Button
                    size="xs"
                    label="delete contact"
                    onClick={handleDeleteContact.bind(null, handleNoticeToggle)}
                    classNames={['btn--primary', 'btn--raised', 'btn--full']}
                />
            </div>
        </form>
    )
}
