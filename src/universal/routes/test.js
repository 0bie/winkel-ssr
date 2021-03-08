import React from 'react'
import serialize from 'serialize-javascript'

/**
 * Uncaught errors encountered during server rendering will cause the Node.js process to exit
 * This route is an example use case for handling SSR errors
 * The error is caught and passed on to the component.
 * The try/catch should prevent the app server from crashing when you visit /test-500-error
 */
export default function Test500Error(props) {
    // try {
    //     throw new Error('Test error encountered while rendering on server')
    // } catch (err) {
    //     console.error(err)
    // }
    return <div>{serialize(props.error,{space: 8, isJSON: true})}</div>
}

Test500Error.getProps = async () => {
    let error
    try {
        throw new Error('Test error encountered while rendering on server')
    } catch (err) {
        error = err
        console.error(err)
    }
    return {
        error: {
            status: error.status,
            message: error.message
        }
    }
}
