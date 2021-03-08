import WinkelAPIClient from '../../../../data/api/client'

import {emptyValue, handleSubmit} from '../../../helpers'

export default async function handleDeleteCompany(fn, evt) {

    evt.preventDefault()
    const form = document.getElementById('company_delete')
    if (!form) {
        throw new Error('handleDeleteCompany requires a valid form element')
    }

    const companyInfo = {}
    const companyInfoData = new FormData(form)
    for (const [key, value] of companyInfoData .entries()) {
        if (value.length > 0) {
            companyInfo[key] = value
        }
    }

    if (evt.target.closest('.panel-action')) {
        if (emptyValue(companyInfo)) return
        const response = await WinkelAPIClient.deleteCompany(companyInfo)
        if (!emptyValue(response.removeCompany)) {
            const {removeCompany: companyData} = response
            handleSubmit({
                duration: 5000,
                handleNotice: fn,
                message: `${companyData.name} was deleted successfully.`
            })
            form.reset()
        } else {
            // handle notice error
        }
    }

}
