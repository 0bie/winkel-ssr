import React from 'react'
import {Notice} from '@0bie/pattern-lib-react'
import {getNoticeIcon} from '../helpers'

import AppContext from './index'
import WinkelAPIClient from '../../data/api/client'

export default class AppProvider extends React.Component {
    constructor(props) {
        super(props)
        this.apiClient = WinkelAPIClient
        this.getUser()
    }
    state = {
        user: {},
        notice: {},
        navigation: {isOpen: false}
    }
    async getUser() {
        const user = await this.apiClient.getUser()
        this.setState(() => ({
            user: user.me
        }))
    }
    render() {
        return (
            <AppContext.Provider
                value={{
                    state: this.state,
                    handleNavToggle: () =>
                        this.setState((prevState) => ({
                            navigation: {
                                isOpen: !prevState.navigation.isOpen
                            },
                        })),
                    handleNoticeToggle: (notice) =>
                        this.setState(() => ({ notice }))
                }}
            >
                <div className="main">{this.props.children}</div>
                {this.state.notice && this.state.notice.status && (
                    <div className="notice-container">
                        <Notice
                            iconPosition="right"
                            state={this.state.notice.status}
                            message={this.state.notice.message}
                            icon={getNoticeIcon(this.state.notice.status)}
                        />
                    </div>
                )}
            </AppContext.Provider>
        )
    }
}
