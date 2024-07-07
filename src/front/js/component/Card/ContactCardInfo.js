import React from 'react'

export const ContactCardInfo = ({ icon, description, title }) => {
    return (
        <React.Fragment>
            <div className="contactCardInfo bg-light d-flex flex-row gap-3 align-items-center" style={{ padding: '20px', height: '150px' }}>
                <div className="icon d-flex flex-column justify-content-center align-items-center" style={{ borderRadius: '90%', backgroundColor: '#5751e1', width: '55px', height: '55px', padding: '20px' }}> <i className={`fa-solid ${icon} text-white`} style={{ fontSize: '30px' }}> </i></div>
                <div className="info d-flex flex-column justify-content-center pt-4">
                    <p className='mediumWeight fs-5 m-0'> {title} </p>
                    <p className='text-dark' style={{ fontSize: '15px' }}> {description}</p>
                </div>
            </div>
        </React.Fragment >
    )
}
