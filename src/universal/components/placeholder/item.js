import React from 'react'

export default function PlaceholderItem() {
    return (
        <li className="cardlist-item cardlist-placeholder">
            <div className="cardlist-media">
                <figure className="image-container" />
            </div>
            <div className="cardlist-content">
                <header className="cardlist-header">
                    <h2 className="cardlist-title placeholder-text" />
                    <div className="cardlist-meta placeholder-text" />
                </header>
                <div className="cardlist-footer">
                    <ul className="meta-list">
                        <li className="meta-item">
                            <h2 className="meta-price placeholder-text" />
                            <div className="meta-source placeholder-text" />
                        </li>
                        <li className="meta-item">
                            <h2 className="meta-date">
                                <span className="meta-duration placeholder-text" />
                                <span className="meta-notice placeholder-text" />
                            </h2>
                        </li>
                    </ul>
                </div>
            </div>
        </li>
    )
}
