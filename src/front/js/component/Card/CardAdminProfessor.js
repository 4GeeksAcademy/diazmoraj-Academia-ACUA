import React, { useContext } from "react";
import { MultiButton } from '../MultiButton'
import { Link } from 'react-router-dom'
import { Context } from '../../store/appContext'

export const CardAdminProfessor = ({ name, id, last_name }) => {
    const { store, actions } = useContext(Context);

    return (
        <div className="cardProfessor, me-3" style={{ width: '16rem', borderRadius: '70%' }}>
            <div className="card cardProff" style={{ borderRadius: '20px' }}>
                {/* <div className="container d-flex justify-content-end mt-2">
                    <MultiButton color='purple' text='Ver más' width='100' />
                </div> */}
                <img src="https://i.imgur.com/qTL6olW.png" className="card-img-top" alt="..." style={{ height: 'auto', padding: '30px' }} />
                <div className="card-body">
                    <p className="card-title fs-5 mediumWeight text-center">{name} {last_name}</p>
                </div>
            </div>
        </div>
    )
}