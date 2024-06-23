import React from "react";
import { Link } from "react-router-dom";
import LogButton from "../component/LogButton";

export const NavbarAdmin = () => {
    return (
        <nav className="navbar navbar-expand-lg bg-white">
            <div className="container-fluid d-flex justify-content-between align-items-baseline">
                <div>
                    <img className="logo" src="https://i.imgur.com/fkBV2BP.png" />
                    <span className="ms-2 fs-6">Jimmy Díaz</span>
                </div>
                <div>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarScroll" aria-controls="navbarScroll" aria-expanded="false" aria-label="Toggle navigation">
                        <i className="fa-solid fa-bars"></i>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarScroll">
                        <ul className="navbar-nav me-auto my-2 my-lg-0 navbar-nav-scroll fs-6">
                            <li>
                                <Link to="/homeacua" className="text-decoration-none nav-link">
                                    <span className="me-4">Inicio</span>
                                </Link>
                            </li>
                            <li className="nav-link">
                                <span className="me-4">Información personal</span>
                            </li>
                            <li>
                                <Link to="/professorpayment" className="nav-link">
                                    <span className="me-4">Pago profesores</span>
                                </Link>
                            </li>
                            <li>
                                <Link to="/professorpayment" className="nav-link">
                                    <span className="me-4">Pago estudiantes</span>
                                </Link>
                            </li>
                        </ul>
                        <LogButton text="Salir" />
                    </div>
                </div>
            </div>
        </nav >
    );
};