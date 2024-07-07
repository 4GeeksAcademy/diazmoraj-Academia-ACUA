import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import LogButton from "../component/LogButton";
import useAuth from "../component/frontAuth/useAuth";
import { useContext } from "react";
import { Context } from "../store/appContext";

export const NavbarProfessor = () => {
    const { store, actions } = useContext(Context)
    const { logout } = useAuth()

    const [professorData, setProfessorData] = useState({})

    useEffect(() => {
        actions.getSingleProfessor()
    }, [])

    console.log(store.singleProfessor)
    console.log(store.singleProfessor.professor?.name)

    return (
        <nav className="navbar navbar-expand-lg bg-white">
            <div className="container-fluid d-flex justify-content-between align-items-baseline">
                <div>
                    <img className="logo" src="https://i.imgur.com/fkBV2BP.png" />
                    <span className="ms-2 fs-6">{store.singleProfessor.professor?.name} {store.singleProfessor.professor?.last_name}</span>
                </div>
                <div>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarScroll" aria-controls="navbarScroll" aria-expanded="false" aria-label="Toggle navigation">
                        <i className="fa-solid fa-bars"></i>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarScroll">
                        <ul className="navbar-nav me-auto my-2 my-lg-0 navbar-nav-scroll fs-6">
                            {/* <li>
                                <Link to="/" className="text-decoration-none nav-link">
                                    <span className="me-4">Inicio</span>
                                </Link>
                            </li> */}
                            <li>
                                <Link to="/formprofessor" className="text-decoration-none nav-link">
                                    <span className="me-4">Información personal</span>
                                </Link>
                            </li>
                            {/* <li className="nav-link">
                                <span className="me-4">Estudios</span>
                            </li> */}
                        </ul>
                        <LogButton text="Salir" action={logout} />
                    </div>
                </div>
            </div>
        </nav >
    );
};