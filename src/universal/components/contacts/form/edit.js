import React, {Fragment, useContext} from 'react'
import {Input, Button} from '@0bie/pattern-lib-react'

import {handleEditContact} from '../helpers'
import AppContext from '../../../context'

export default function EditContactForm({contact}) {

    const {handleNoticeToggle} = useContext(AppContext)
    return (
        <Fragment>
            <form id="contact_edit" className="panel-form">
                <input name="id" value={contact.id} type="hidden" />
                <div className="panel-input mb--xs">
                    <label className="input-label">first name</label>
                    <Input
                        size="xs"
                        name="firstName"
                        defaultValue={contact.firstName}
                        classNames={['input--full']}
                    />
                </div>
                <div className="panel-input mb--xs">
                    <label className="input-label">last name</label>
                    <Input
                        size="xs"
                        name="lastName"
                        defaultValue={contact.lastName}
                        classNames={['input--full']}
                    />
                </div>
                <div className="panel-input mb--xs">
                    <label className="input-label">email</label>
                    <Input
                        size="xs"
                        name="email"
                        classNames={['input--full']}
                        defaultValue={contact.email || ''}
                    />
                </div>
                <div className="panel-input mb--xs">
                    <label className="input-label">role</label>
                    <Input
                        size="xs"
                        name="role"
                        classNames={['input--full']}
                        defaultValue={contact.role || ''}
                    />
                </div>
                <div className="panel-input mb--xs">
                    <label className="input-label">biography</label>
                    <Input
                        rows="8"
                        cols="5"
                        size="xs"
                        name="bio"
                        type="textField"
                        defaultValue={contact.bio || ''}
                        inputClassNames={['input--note']}
                        classNames={['input--full']}
                    />
                </div>
                <div className="panel-action">
                    <Button
                        size="xs"
                        label="edit contact"
                        classNames={['btn--primary', 'btn--raised', 'btn--full']}
                        onClick={handleEditContact.bind(null, handleNoticeToggle)}
                    />
                </div>
            </form>
        </Fragment>
    )

}
