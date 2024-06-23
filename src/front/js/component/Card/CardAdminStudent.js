import React from 'react'
import { MultiButton } from '../MultiButton'
import { Link } from 'react-router-dom'

export const CardAdminStudent = () => {
    return (
        <div className="cardProfessor" style={{ width: '20rem' }}>
            <div className="card cardProff" style={{ borderRadius: '20px' }}>
                <img src="https://i.imgur.com/qTL6olW.png" className="card-img-top" alt="..." style={{ height: 'auto', padding: '30px' }} />
                <div className="card-body">
                    <p className="card-title fs-5 mediumWeight text-center">Greiza García</p>
                </div>
            </div>
        </div>
    )
}