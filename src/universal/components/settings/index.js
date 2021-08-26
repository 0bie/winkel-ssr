import React, {Fragment, useContext} from 'react'
import {Button, Input} from '@0bie/pattern-lib-react'

import {handleEditUser} from './helpers'

import AppContext from '../../context'

export default function Settings() {
    const {state, handleNoticeToggle} = useContext(AppContext)
    return (
        <Fragment>
            <header className="header--panel header--contact">
                <h1 className="title--panel">Settings</h1>
            </header>
            {state && state.user && (
                <section className="content--setting">
                    <form id="user_edit" className="panel-form">
                        <div className="panel-input mb--sm">
                            <label className="input-label" htmlFor="apiKey">API Key</label>
                            <Input
                                size="xs"
                                disabled
                                name="apiKey"
                                inputId="apiKey"
                                defaultValue={state.user.apiKey}
                                classNames={['input--full']}
                            />
                        </div>
                        <div className="input-row">
                            <div className="panel-input mb--sm">
                                <label htmlFor="fName" className="input-label">
                                    first name
                                </label>
                                <Input
                                    size="xs"
                                    inputId="fName"
                                    name="firstName"
                                    defaultValue={state.user.firstName}
                                    classNames={['input--full']}
                                />
                            </div>
                            <div className="panel-input mb--sm">
                                <label htmlFor="lName" className="input-label">last name</label>
                                <Input
                                    size="xs"
                                    inputId="lName"
                                    name="lastName"
                                    placeholder="Doe"
                                    defaultValue={state.user.lastName}
                                    classNames={['input--full']}
                                />
                            </div>
                        </div>
                        <div className="panel-input mb--sm">
                            <label htmlFor="email" className="input-label">email</label>
                            <Input
                                size="xs"
                                inputId="email"
                                name="email"
                                classNames={['input--full']}
                                defaultValue={state.user.email}
                            />
                        </div>
                        <div className="panel-input mb--sm">
                            <label htmlFor="pwd" className="input-label">password</label>
                            <Input
                                size="xs"
                                inputId="pwd"
                                name="password"
                                type="password"
                                classNames={['input--full']}
                                placeholder="**************"
                            />
                        </div>
                        <div className="panel-action">
                            <Button
                                size="xs"
                                label="save"
                                onClick={handleEditUser.bind(null, handleNoticeToggle)}
                                classNames={[
                                    'btn--primary',
                                    'btn--raised',
                                    'btn--setting'
                                ]}
                            />
                        </div>
                    </form>
                </section>
            )}
        </Fragment>
    )
}
