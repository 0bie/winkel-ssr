import React, {useState} from 'react'
import {Button, Notice} from '@0bie/pattern-lib-react'

import Sidebar from '../sidebar'
import CompanyItem from './item'
import {sortObjects} from '../../helpers'
import CompanyItemPlaceholder from  './placeholder'

import {AddCompanyForm, OfferCompanyForm, DeleteCompanyForm} from './form'

export default function Companies({data}) {
    const sortedCompanies = data && data.length && sortObjects(data, 'name')
    const [SidebarState, setSidebarState] = useState({ isOpen: false })
    const handleToggle = (props) => {
        return setSidebarState({ isOpen: !SidebarState.isOpen, ...props })
    }

    return (
        <div className="content--company">
            <header className="header--panel header--company">
                <h1 className="title--panel">Companies</h1>
                <div className="company-add">
                    <Button
                        size="xs"
                        label="new company"
                        classNames={['btn--primary']}
                        onClick={handleToggle.bind(null, {
                            children: <AddCompanyForm />,
                            title: 'Add A New Company'
                        })}
                    />
                </div>
            </header>
            <section className="company-section">
                <ul className="list--company">
                    {data &&
                        data.length > 0 &&
                        sortedCompanies.map((company) => (
                            <CompanyItem
                                key={company.id}
                                company={company}
                                handleOffer={handleToggle.bind(null, {
                                    children: (
                                        <OfferCompanyForm company={company} />
                                    ),
                                    title: `${company.name} Offer Form`,
                                })}
                                handleDelete={handleToggle.bind(null, {
                                    children: (
                                        <DeleteCompanyForm company={company} />
                                    ),
                                    title: `Delete ${company.name}`
                                })}
                            />
                        ))}
                    {(!data || data.length <= 0) && (
                        <CompanyItemPlaceholder />
                    )}
                </ul>
            </section>
            <Sidebar handleToggle={handleToggle} {...SidebarState} />
        </div>
    )
}
