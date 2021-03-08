import WinkelAPIClient from '../../../../data/api/client'

import {getFullName} from '../../overview/helpers'
import {emptyValue, handleSubmit} from '../../../helpers'

export default async function handleDeleteContact(fn, evt) {
    evt.preventDefault()
    const form = document.getElementById('contact_delete')
    if (!form) {
        throw new Error('handleDeleteContact requires a valid form element')
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
        const response = await WinkelAPIClient.deleteContact(contactInfo)
        if (!emptyValue(response.removeContact)) {
            const { removeContact: contactData } = response
            handleSubmit({
                duration: 5000,
                handleNotice: fn,
                message: `${getFullName(
                    contactData.firstName,
                    contactData.lastName
                )} was deleted successfully.`
            })
            form.reset()
        } else {
            // handle notice error
        }
    }
}
