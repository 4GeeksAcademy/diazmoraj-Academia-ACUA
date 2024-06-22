import React from 'react'

export const CircleIcon = ({ imageURL, height, padding }) => {

    const errorHandler = () => {
        return <div> Loading </div>
    }
    return (
        <React.Fragment>
            <div className="Circle-icon">
                <img className={`pb-${padding}`} src={imageURL} alt="" onError={errorHandler} style={{ height: `${height}px` }} />
            </div>
        </React.Fragment>
    )
};