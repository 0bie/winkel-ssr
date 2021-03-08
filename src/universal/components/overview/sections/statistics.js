import React, {Fragment, useContext} from 'react'
import {
  CompanyChart,
  ContactChart,
  ProductChart
} from '../../chart'
import {pluralize, formatNumber} from '../../../helpers'

import AppContext from '../../../context'

export default function Statistics({products, contacts, companies}) {

    const {state} = useContext(AppContext)
    return (
        /* eslint-disable react/no-unescaped-entities */
        <section className="overview-stats">
            <ul className="stats-list">
                <li className="stats-item width-50--small">
                    {state.user && state.user.messages && (
                        <Fragment>
                            <header className="stats-header">
                                <h3>
                                    <span className="stats-title">
                                        contacts
                                    </span>
                                    {state.user && state.user.messages > 0 && (
                                        <small>
                                            You've messaged{' '}
                                            {state.user.messages}{' '}
                                            {pluralize(
                                                'contact',
                                                state.user.messages.length
                                            )}
                                        </small>
                                    )}
                                </h3>
                            </header>
                            {contacts && contacts.length && (
                                <div className="stats-content">
                                    <span className="stats-value">
                                        {formatNumber(contacts.length)}
                                    </span>
                                </div>
                            )}
                            <footer className="stats-footer">
                                <ContactChart />
                            </footer>
                        </Fragment>
                    )}
                </li>
                <li className="stats-item width-50--small">
                    {state.user && state.user.orders && (
                        <Fragment>
                            <header className="stats-header">
                                <h3>
                                    <span className="stats-title">
                                        products
                                    </span>
                                    {state.user.orders > 0 && (
                                        <small>
                                            You've ordered {state.user.orders}{' '}
                                            {pluralize(
                                                'product',
                                                state.user.orders.length
                                            )}
                                        </small>
                                    )}
                                </h3>
                            </header>
                            {products && products.length && (
                                <div className="stats-content">
                                    <span className="stats-value">
                                        {formatNumber(products.length)}
                                    </span>
                                </div>
                            )}
                            <footer className="stats-footer">
                                <ProductChart />
                            </footer>
                        </Fragment>
                    )}
                </li>
                <li className="stats-item">
                    {state.user && state.user.offers && (
                        <Fragment>
                            <header className="stats-header">
                                <h3>
                                    <span className="stats-title">
                                        companies
                                    </span>
                                    {state.user && state.user.offers > 0 && (
                                        <small>
                                            You've inquired on{' '}
                                            {state.user.offers}{' '}
                                            {pluralize(
                                                'offer',
                                                state.user.offers.length
                                            )}
                                        </small>
                                    )}
                                </h3>
                            </header>
                            {companies && companies.length && (
                                <div className="stats-content">
                                    <span className="stats-value">
                                        {formatNumber(companies.length)}
                                    </span>
                                </div>
                            )}
                            <footer className="stats-footer">
                                <CompanyChart />
                            </footer>
                        </Fragment>
                    )}
                </li>
            </ul>
        </section>
    )
}

