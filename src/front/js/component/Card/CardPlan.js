import React from 'react'
import { MultiButton } from '../MultiButton'




export const CardPlan = ({ planType, planModality, price, firstFeature, secondFeature, thirdFeature, fontSz }) => {

    console.log(fontSz)
    return (
        <React.Fragment>
            <div className="cardPlan d-flex flex-column align-items-center justify-content-center" style={{ gap: '35px' }}>
                <div className="planType">
                    <span>{planType}</span>
                </div>
                <div className="planPrice d-flex flex-row">
                    <h3 className='text-dark' style={{ fontWeight: '700', fontSize: `${fontSz}px`, textAlign: 'center' }}>{price}</h3>
                    <p className='pt-3 fw-bold text-dark'>{planModality}</p>
                </div>
                <div className="planFeatures">
                    <ul className='text-secondary d-flex flex-column gap-2' style={{ fontSize: '18px' }}>
                        <li> {firstFeature} </li>
                        <li> {secondFeature} </li>
                        <li> {thirdFeature} </li>
                    </ul>
                </div>
                <MultiButton color="orange" text="Suscribete" width="160" link='/signup' />
            </div>
        </React.Fragment>
    )
}
