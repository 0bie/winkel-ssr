import React, {useContext} from 'react'
import {Button, Input} from '@0bie/pattern-lib-react'

import AppContext from '../../../context'
import {handleOfferCompany, renderSelectOptions} from '../helpers'

export default function OfferCompanyForm({company}) {
    const {handleNoticeToggle} = useContext(AppContext)
    return (
        <form id="form_order" className="panel-form">
            {company && <input name="id" value={company.id} type="hidden" />}
            <div>
                <div className="panel-input mb--sm">
                    <label className="input-label">choose a product</label>
                    <select
                        name="product"
                        className="input input--xs input--full"
                    >
                        <option value="">Choose a product</option>
                        {company.products.length > 0 &&
                            company.products.map(renderSelectOptions)}
                    </select>
                </div>
                <div className="panel-input mb--sm">
                    <label className="input-label">quantity</label>
                    <Input
                        size="xs"
                        min="0"
                        max="20"
                        name="units"
                        type="number"
                        classNames={['input--full']}
                    />
                </div>
            </div>
            <div className="panel-action">
                <Button
                    size="xs"
                    label="send offer"
                    onClick={handleOfferCompany.bind(null, handleNoticeToggle)}
                    classNames={['btn--primary', 'btn--raised', 'btn--full']}
                />
            </div>
        </form>
    )
}
