import React, {useContext} from 'react'
import {Button, Notice} from '@0bie/pattern-lib-react'

import AppContext from '../../../context'
import {handleDeleteCompany} from '../helpers'

export default function DeleteCompanyForm({company}) {
    const {handleNoticeToggle} = useContext(AppContext)
    return (
        <form id="company_delete" className="panel-form">
            <input name="id" value={company.id} type="hidden" />
            <Notice
                state="warn"
                iconPosition="left"
                classNames={['mb--md']}
                icon={{
                    id: 'warning',
                    size: 'sm',
                    title: `delete ${company.name}`
                }}
                message={`You're about to delete ${company.name} from companies.`}
            />
            <div className="panel-action">
                <Button
                    size="xs"
                    label="delete company"
                    classNames={['btn--primary', 'btn--raised', 'btn--full']}
                    onClick={handleDeleteCompany.bind(null, handleNoticeToggle)}
                />
            </div>
        </form>
    )
}
