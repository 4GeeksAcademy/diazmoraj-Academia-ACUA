import React from "react";
import { Link } from "react-router-dom";

export const CardProfessorStudent = () => {
    return (
        <div className="card" style={{ width: '20rem' }}>
            <div className="container card-header fw-bold">
                <div className="row">
                    <div className="col">
                        <span className="fs-4">Roberto Antillón</span>
                    </div>
                    <div className="col">
                        <button type="button" className="btn btn-small btn-warning fs-5 fw-lighter text-dark text-start rounded-pill">Ver más<i className="ms-2 fa-solid fa-angles-right"></i></button>
                    </div>
                </div>
            </div>
            <img src="https://i.imgur.com/mJV2l8W.jpeg" className="card-img-top" />
            <div className="card-body">
                <table className="table table-borderless">
                    <tr>
                        <td className="text-secondary fs-4 fw-semibold">Curso</td>
                        <td className="fw-lighter fs-4">Guitarra Eléctrica</td>
                    </tr>
                </table>
            </div>
        </div>
    );
};