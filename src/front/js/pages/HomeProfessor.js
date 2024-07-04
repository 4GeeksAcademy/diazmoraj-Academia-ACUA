import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import LogButton from "../component/LogButton";
import { useContext } from "react";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";
import { NavbarProfessor } from "./NavbarProfessor";
import "../../styles/home.css";

export const HomeProfessor = () => {
    const { store, actions } = useContext(Context)

    const [professorCourseData, setProfessorCourseData] = useState({})

    useEffect(() => {
        actions.getProfessorCourses()
    }, [])

    console.log(store.singleProfessor)
    console.log(store.singleProfessor.professor?.name)

    return (
        <React.Fragment>
            <NavbarProfessor />
            <div className="container-fluid pb-5">
                <div className="d-flex align-content-center justify-content-center mb-3 mt-3 py-4 jumbo rounded-3">
                    <div className="container-fluid align-content-center">
                        <h4 className="py-2 ps-5 ms-5 fs-3 fw-bold">Estudiantes asignados</h4>
                    </div>
                </div>
                <div className="continer-fluid d-flex ps-5 ms-5">
                    <div className="cardProfessor" style={{ width: '20rem' }}>
                        <div className="card cardProff" style={{ borderRadius: '20px' }}>
                            <img src="https://i.imgur.com/qTL6olW.png" className="card-img-top" alt="..." style={{ height: 'auto', padding: '30px' }} />
                            <div className="card-body">
                                <p className="card-title fs-5 mediumWeight text-center">Greiza García</p>
                                <ul className="list-group list-group-flush">
                                    <li className="list-group-item text-secondary" style={{ fontSize: '15px' }}>Curso: Guitarra eléctrica</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="d-flex align-content-center justify-content-center mb-3 mt-3 py-4 jumbo rounded-3">
                    <div className="container-fluid align-content-center">
                        <h4 className="py-2 ps-5 ms-5 fs-3 fw-bold">Información pago</h4>
                    </div>
                </div>
                <div className="continer-fluid d-flex ps-5 ms-5 my-5">
                    <div className="cardProfessor" style={{ width: '36rem' }}>
                        <div className="container d-flex card-body card cardProff" style={{ borderRadius: '20px' }}>
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
                {/* <div className="continer-fluid d-flex ps-5 my-5">
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
                </div> */}
            </div>
        </React.Fragment>
    )
}