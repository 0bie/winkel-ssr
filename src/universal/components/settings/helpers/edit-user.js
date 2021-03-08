import WinkelAPIClient from '../../../../data/api/client'
import {emptyValue, handleSubmit} from '../../../helpers'

import {getFullName} from './index'

export default async function handleEditUser(fn, evt) {
    evt.preventDefault()
    const form = document.getElementById('user_edit')
    if (!form) {
        throw new Error('handleEditUser requires a valid form element')
    }

    const userInfo = {}
    const userInfoData = new FormData(form)
    for (const [key, value] of userInfoData.entries()) {
        if (value.length > 0) {
            userInfo[key] = value
        }
    }

    const userInput = {
        input: userInfo
    }

    if (evt.target.closest('.panel-action')) {
        if (emptyValue(userInfo)) return
        const response = await WinkelAPIClient.editUser(userInput)
        if (!emptyValue(response.updateMe)) {
            const {updateMe: userData} = response
            handleSubmit({
                duration: 5000,
                handleNotice: fn,
                message: `${getFullName(
                    userData.firstName,
                    userData.lastName
                )} was updated successfully.`
            })
            form.reset()
        } else {
            // handle notice error
        }
    }
}
