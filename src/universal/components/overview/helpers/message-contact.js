import WinkelAPIClient from '../../../../data/api/client'
import {emptyValue, handleSubmit} from '../../../helpers'

export default async function handleMessageContact(fn, evt) {
    evt.preventDefault()
    const form = document.getElementById('contact_message')
    if (!form) {
        throw new Error('handleMessageContact requires a valid form element')
    }
    const message = {}
    const messageData = new FormData(form)
    for (const [key, value] of messageData.entries()) {
        if (value.length > 0) {
            message[key] = value
        }
    }
    if (evt.target.closest('.panel-action')) {
        if (emptyValue(message)) return
        if (!message.id) return
        const response = await WinkelAPIClient.messageContact(message)
        if (!emptyValue(response.messageContact)) {
            handleSubmit({
                duration: 5000,
                handleNotice: fn,
                message: 'Your message has been sent.'
            })
            form.reset()
        }
    }
}
