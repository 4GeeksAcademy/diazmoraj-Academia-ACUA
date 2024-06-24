import React from 'react'
import { MultiButton } from '../MultiButton'


//Please take in account that this card only work with Carrousel, due his form, these are Li's

export const CardProfessorAdmin = ({ number, name, lastName, district, province }) => {
    return (
        <React.Fragment>
            <div className="cardProfessor">
                <div className="card cardProff" style={{ borderRadius: '20px' }}>
                    <div className="container d-flex justify-content-end mt-2">
                        <MultiButton color='purple' text='Ver más' width='100' />
                    </div>
                    <img src={`https://xsgames.co/randomusers/assets/avatars/male/${number}.jpg`} className="card-img-top" alt="..." style={{ height: 'auto', padding: '30px', borderRadius: '70%' }} />
                    <div className="card-body">
                        <p className="card-title fs-5 mediumWeight">{name} {lastName}</p>
                        {/* <ul class="list-group list-group-flush">
                            <li class="list-group-item text-secondary" style={{ fontSize: '15px' }}>Provincia: {province}</li>
                            <li class="list-group-item text-secondary" style={{ fontSize: '15px' }}>Distrito: {district}</li>
                        </ul> */}
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}

