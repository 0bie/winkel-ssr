import React, {useContext} from 'react'
import {Input, Button} from '@0bie/pattern-lib-react'

import AppContext from '../../../context'
import {handleMessageContact} from '../../overview/helpers'

export default function MessageContactForm({contact}) {
    const {handleNoticeToggle} = useContext(AppContext)
    return (
        <form id="contact_message" className="panel-form">
            {contact && <input name="id" value={contact.id} type="hidden" />}
            <div>
                <div className="panel-input mb--sm">
                    <label className="input-label">subject</label>
                    <Input
                        size="xs"
                        name="subject"
                        placeholder="Message Subject"
                        classNames={['input--full']}
                    />
                </div>
                <div className="panel-input mb--sm">
                    <label className="input-label">message</label>
                    <Input
                        size="xs"
                        rows="15"
                        cols="20"
                        name="text"
                        type="textField"
                        inputClassNames={['input--note']}
                        placeholder="Compose a message..."
                        classNames={['input--full']}
                    />
                </div>
            </div>
            <div className="panel-action">
                <Button
                    size="xs"
                    label="send message"
                    classNames={['btn--primary', 'btn--raised', 'btn--full']}
                    onClick={handleMessageContact.bind(null, handleNoticeToggle)}
                />
            </div>
        </form>
    )

}
