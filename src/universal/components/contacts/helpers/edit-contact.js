import WinkelAPIClient from '../../../../data/api/client'

import {getFullName} from '../../overview/helpers'
import {emptyValue, handleSubmit} from '../../../helpers'

export default async function handleEditContact(fn, evt) {
    evt.preventDefault()
    const form = document.getElementById('contact_edit')
    if (!form) {
        throw new Error('handleEditContact requires a valid form element')
    }

    const contactInfo = {}
    const contactInfoData = new FormData(form)
    for (const [key, value] of contactInfoData.entries()) {
        if (value.length > 0) {
            contactInfo[key] = value
        }
    }

    if (evt.target.closest('.panel-action')) {
        if (emptyValue(contactInfo)) return
        const response = await WinkelAPIClient.editContact(contactInfo)
        if (!emptyValue(response.updateContact)) {
            const {updateContact: contactData} = response
            handleSubmit({
                duration: 5000,
                handleNotice: fn,
                message: `${getFullName(
                    contactData.firstName,
                    contactData.lastName
                )} was updated successfully.`
            })
            form.reset()
        } else {
            // handle notice error
        }
    }
}
