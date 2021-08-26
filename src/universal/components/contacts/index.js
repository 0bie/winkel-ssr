import React, {Fragment, useState} from 'react'
import {Button} from '@0bie/pattern-lib-react'

import ContactCard from './card'
import Sidebar from '../sidebar'
import ContactCardPlaceholder from  './placeholder'

import {
    AddContactForm,
    EditContactForm,
    DeleteContactForm,
    MessageContactForm
} from './form'

import {sortObjects} from '../../helpers'

export default function Contacts({data}) {
    const sortedContacts = data && data.length && sortObjects(data, 'firstName')
    const [SidebarState, setSidebarState] = useState({ isOpen: false })
    const handleToggle = (props) => {
        return setSidebarState({isOpen: !SidebarState.isOpen, ...props})
    }

    return (
        <Fragment>
            <header className="header--panel header--contact">
                <h1 className="title--panel">Contacts</h1>
                <div className="contact-add">
                    <Button
                        size="xs"
                        label="new contact"
                        classNames={['btn--primary']}
                        onClick={handleToggle.bind(null, {
                            children: <AddContactForm />,
                            title: 'Create A New Contact'
                        })}
                    />
                </div>
            </header>
            <div className="content--contact">
                {data &&
                    data.length > 0 &&
                    sortedContacts.map((contact) => (
                        <ContactCard
                            user={contact}
                            key={contact.id}
                            handleEdit={handleToggle.bind(null, {
                                children: <EditContactForm contact={contact} />,
                                title: `Edit ${contact.firstName} ${contact.lastName}`
                            })}
                            handleDelete={handleToggle.bind(null, {
                                children: (
                                    <DeleteContactForm contact={contact} />
                                ),
                                title: `Delete ${contact.firstName} ${contact.lastName}`
                            })}
                            handleMessage={handleToggle.bind(null, {
                                children: (
                                    <MessageContactForm contact={contact} />
                                ),
                                title: `Message ${contact.firstName} ${contact.lastName}`
                            })}
                        />
                    ))}
                {!data && (
                    <ContactCardPlaceholder />
                )}
            </div>
            <Sidebar handleToggle={handleToggle} {...SidebarState} />
        </Fragment>
    )
}
