import WinkelAPIClient from '../../../../data/api/client'

import {emptyValue, handleSubmit} from '../../../helpers'

export default async function handleAddContact(fn, evt) {

    evt.preventDefault()
    const form = document.getElementById('company_add')
    if (!form) {
        throw new Error('handleAddCompany requires a valid form element')
    }

    const info = {}
    const infoData = new FormData(form)
    for (const [key, value] of infoData.entries()) {
        if (value.length > 0) {
            if (key === 'image') {
                info[key] = {src: value, alt: 'alternate image text'}
            } else {
                info[key] = value
            }
        }
    }

    if (evt.target.closest('.panel-action')) {
        if (emptyValue(info)) return
        const response = await WinkelAPIClient.addCompany(info)
        if (!emptyValue(response.newCompany)) {
            const {newCompany: companyData} = response
            handleSubmit({
                duration: 5000,
                handleNotice: fn,
                message: `${companyData.name} was added successfully.`
            })
            form.reset()
        }
    }

}
