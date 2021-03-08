import WinkelAPIClient from '../../../../data/api/client'

import {getFullName} from './index'
import {emptyValue, handleSubmit} from '../../../helpers'

export default async function handleAddContact(fn, evt) {
    evt.preventDefault()
    const form = document.getElementById('contact_add')
    if (!form) {
        throw new Error('handleAddContact requires a valid form element')
    }

    const info = {}
    const infoData = new FormData(form)
    for (const [key, value] of infoData.entries()) {
        if (value.length > 0) {
            info[key] = value
        }
    }

    if (evt.target.closest('.panel-action')) {
        if (emptyValue(info)) return
        const response = await WinkelAPIClient.addContact(info)
        if (!emptyValue(response.newContact)) {
            const {newContact} = response
            const contactData = Object.assign({}, newContact, {
                createdAt: new Date().toISOString()
            })
            handleSubmit({
                duration: 5000,
                handleNotice: fn,
                message: `${getFullName(
                    contactData.firstName,
                    contactData.lastName
                )} was added successfully.`
            })
            form.reset()
        }
    }
}
