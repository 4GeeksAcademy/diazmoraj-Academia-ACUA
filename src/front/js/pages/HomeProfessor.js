import React from "react";
import rigoImage from "../../img/rigo-baby.jpg";
import "../../styles/home.css";

export const HomeProfessor = () => (
    <div className="container-fluid">
        <div className="d-flex align-content-center justify-content-center mb-3 mt-3 py-4 jumbo rounded-3">
            <div className="container-fluid align-content-center">
                <h4 className="py-2 ps-5 ms-5 fs-3 fw-bold">Estudiantes asignados</h4>
            </div>
        </div>
        <div className="continer-fluid d-flex ps-5 ms-5">
            <div>
                <div className="card" style={{ width: '20rem' }}>
                    <div className="card-header fs-5 fw-bold">
                        Greiza García
                    </div>
                    <img src="https://cdn3.iconfinder.com/data/icons/books-and-reading/512/Artboard_2_copy_3-512.png" className="card-img-top" />
                    <div className="card-body">
                        <table className="table table-borderless">
                            <tr>
                                <td className="text-secondary fs-5 fw-semibold">Curso</td>
                                <td className="fw-lighter fs-5">Guitarra eléctrica</td>
                            </tr>
                        </table>
                    </div>
                </div>
            </div>
        </div>
        <div className="d-flex align-content-center justify-content-center mb-3 mt-3 py-4 jumbo rounded-3">
            <div className="container-fluid align-content-center">
                <h4 className="py-2 ps-5 ms-5 fs-3 fw-bold">Información pago</h4>
            </div>
        </div>
        <div className="continer-fluid d-flex ps-5 my-5">
            <div className="card" style={{ width: '36rem' }}>
                <div className="container d-flex card-body">
                    <table className="table table-borderless text-end">
                        <tr className="pb-4">
                            <td className="text-secondary fs-4 fw-semibold">Fecha pago:</td>
                            <td className="fw-lighter fs-4">30 Junio 2024</td>
                        </tr>
                        <tr className="pb-4">
                            <td className="text-secondary fs-4 fw-semibold">Monto por hora:</td>
                            <td className="fw-lighter fs-4">₡ 40.000</td>
                        </tr>
                        <tr>
                            <td className="text-secondary fs-4 fw-semibold">Cantidad de horas registradas:</td>
                            <td className="fw-lighter fs-4">20</td>
                        </tr>
                        <tr>
                            <td className="text-secondary fs-4 fw-semibold">Total pago:</td>
                            <td className="fw-lighter fs-4">₡ 800.000</td>
                        </tr>
                    </table>
                </div>
            </div>
        </div>
    </div>
);
