import React from "react";
import { Link } from "react-router-dom";

export const CardStudentProfessor = () => {
    return (
        <div className="card" style={{ width: '20rem' }}>
            <div className="container card-header fw-bold">
                <span className="fs-4">Greiza García</span>
            </div>
            <img src="https://cdn3.iconfinder.com/data/icons/books-and-reading/512/Artboard_2_copy_3-512.png" className="card-img-top" />
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