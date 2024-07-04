import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import LogButton from "../component/LogButton";
import useAuth from "../component/frontAuth/useAuth";
import { useContext } from "react";
import { Context } from "../store/appContext";

export const NavbarStudent = () => {
	const { store, actions } = useContext(Context)
	const { logout } = useAuth()

	const [studentData, setStudentData] = useState({})

	useEffect(() => {
		actions.getSingleStudent()
	}, [])

	console.log(store.singleStudent)
	console.log(store.singleStudent.student?.name)

	return (
		<React.Fragment>
			<nav className="navbar navbar-expand-lg bg-white">
				<div className="container-fluid d-flex justify-content-between align-items-baseline">
					<div>
						<img className="logo" src="https://i.imgur.com/fkBV2BP.png" />
						<span className="ms-2 fs-6">{store.singleStudent.student?.name} {store.singleStudent.student?.last_name}</span>
					</div>
					<div>
						<button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarScroll" aria-controls="navbarScroll" aria-expanded="false" aria-label="Toggle navigation">
							<i className="fa-solid fa-bars " style={{ fontSize: '35px' }}></i>
						</button>
						<div className="collapse navbar-collapse" id="navbarScroll">
							<ul className="navbar-nav me-auto my-2 my-lg-0 navbar-nav-scroll fs-6">
								{/* <li>
									<Link to="/" className="text-decoration-none nav-link">
										<span className="me-4">Inicio</span>
									</Link>
								</li> */}
								<li>
									<Link to="/formstudent" className="text-decoration-none nav-link">
										<span className="me-4">Información personal</span>
									</Link>
								</li>
								<li>
									<Link to="/electronicinvoice" className="text-decoration-none nav-link">
										<span className="me-4">Facturación</span>
									</Link>
								</li>
							</ul>
							<LogButton text="Salir" action={logout} />
						</div>
					</div>
				</div>
			</nav >
		</React.Fragment>
	);
};