import React from 'react'
import { MultiButton } from '../MultiButton'


export const CardPlan = ({ planType, planModality, price, firstFeature, secondFeature, thirdFeature }) => {
    return (
        <React.Fragment>
            <div className="cardPlan d-flex flex-column align-items-center justify-content-center" style={{ gap: '35px' }}>
                <div className="planType">
                    <span>Plan 1 presencial - virtual</span>
                </div>
                <div className="planPrice d-flex flex-row">
                    <h3 className='text-dark' style={{ fontWeight: '700', fontSize: '50px' }}>¢65000</h3>
                    <p className='pt-3 fw-bold text-dark'>por mes</p>
                </div>
                <div className="planFeatures">
                    <ul className='text-secondary d-flex flex-column gap-2' style={{ fontSize: '18px' }}>
                        <li> Clases de 1 hora </li>
                        <li> 1 vez por semana </li>
                        <li> Instrumentos a disposicion </li>
                    </ul>
                </div>
                <MultiButton color="orange" text="Suscribete" width="160" link='/signup' />
            </div>
        </React.Fragment>
    )
}
