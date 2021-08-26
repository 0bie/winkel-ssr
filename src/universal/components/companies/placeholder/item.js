import React from 'react'

export default function CompanyItemPlaceholder() {
    return (
        <li className="company-item placeholder">
            <div className="company-media" />
            <div className="company-content placeholder">
                <div className="company-meta">
                    <h2 className="company-title" />
                    <span className="company-location" />
                </div>
            </div>
            <div className="company-meta">
                <h2 className="company-status">
                    <span />
                </h2>
                <span className="company-supply" />
            </div>
            <div className="company-actions">
                <button type="button" className="btn">
                    <span className="btn-text" />
                </button>
                <button type="button" className="btn" />
            </div>
        </li>
    )
}
