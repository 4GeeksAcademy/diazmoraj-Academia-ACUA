import React, { useContext, useEffect } from "react";
import { MultiButton } from '../MultiButton'
import { Link } from 'react-router-dom'
import { Context } from '../../store/appContext'

export const CardStudentCourses = ({ professor, id, course }) => {

    const { store, actions } = useContext(Context);

    return (
        <div className="cardProfessor me-3" style={{ width: '20rem' }}>
            <div className="card cardProff" style={{ borderRadius: '20px' }}>
                <div className="card-body">
                    <p className="card-title fs-5 text-center mediumWeight">{course}</p>
                    <table className="table table-borderless">
                        <tr className="pb-3">
                            <td className="text-secondary fs-5 fw-semibold">Profesor:</td>
                            <td className="fw-lighter fs-5 ps-3">{professor}</td>
                        </tr>
                        <tr>
                            <td className="text-secondary fs-5 fw-semibold">Modalidad:</td>
                            <td className="fw-lighter fs-5 ps-3">Por definir</td>
                        </tr>
                    </table>
                </div>
            </div>
        </div>
    )
}