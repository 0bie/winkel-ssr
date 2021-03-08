import React from 'react'
import ERROR_IMAGE from '../../../public/assets/error/error.svg'

require('../../styles/routes/_route-error.scss')

export default function NoMatch({status = 404}) {
    return (
        <div className="route--error p--lg">
            <div className="content-error">
                {status && <h1 className="title-error">{status}</h1>}
                {
                    status == 404 &&
                    <React.Fragment>
                        <h2 className="mb--xs">Sorry, page not found!</h2>
                        <p className="text-error">
                            The page you were looking for does not exist. You may have mistyped
                            the address or the page may have moved.
                        </p>
                    </React.Fragment>
                }
                {
                    status == 500 &&
                    <React.Fragment>
                        <h2 className="mb--xs">Something went wrong!</h2>
                    </React.Fragment>
                }
                <a href="/" tabIndex="0" className="btn btn--md btn--redirect">
                    <span>Go to Homepage</span>
                </a>
            </div>
            {<div className="image-error" dangerouslySetInnerHTML={{__html: ERROR_IMAGE}} />}
        </div>
    )
}
