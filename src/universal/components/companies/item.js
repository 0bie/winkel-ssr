import React from 'react'
import {Button} from '@0bie/pattern-lib-react'
import {deleteIcon} from '../../../data/icon'

export default function CompanyItem({company, handleOffer, handleDelete}) {
    return (
        <li className="company-item">
            <div className="company-media">
                {company && company.image ? (
                    <img src={company.image.src} alt={company.image.alt} loading="lazy" />
                ) : (
                    <img
                        src="https://winkel-ssr.obie.dev/assets/logo/winkel.svg"
                        alt="default company image"
                        loading="lazy"
                    />
                )}
            </div>
            <div className="company-content">
                <div className="company-meta">
                    <h2 className="company-title">{company.name}</h2>
                    <span className="company-location">{company.location}</span>
                </div>
                <div className="company-meta">
                    <h2 className="company-status">
                        {company && company.products.length > 0 ? (
                            <span>active</span>
                        ) : (
                            <span className="text--danger">inactive</span>
                        )}
                    </h2>
                    <span className="company-supply">{company.quantity}</span>
                </div>
                <div className="company-actions">
                    {company && company.products.length > 0 && (
                        <Button
                            size="xs"
                            label="make offer"
                            onClick={handleOffer}
                            classNames={['btn--primary']}
                        />
                    )}
                    <Button
                        size="xs"
                        icon={deleteIcon}
                        onClick={handleDelete}
                        classNames={['btn--primary']}
                    />
                </div>
            </div>
        </li>
    )
}

