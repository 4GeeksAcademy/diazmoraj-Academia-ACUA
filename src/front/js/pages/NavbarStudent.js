import React from "react";
import { Link } from "react-router-dom";

export const NavbarStudent = () => {
	return (
		<nav className="navbar navbar-expand-lg bg-white">
			<div className="container-fluid d-flex justify-content-between">
				<div>
					<img className="logo" src="https://i.imgur.com/fkBV2BP.png" />
					<span className="ms-2 pt-4 fs-3">Greiza García</span>
				</div>
				<div>
					<button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarScroll" aria-controls="navbarScroll" aria-expanded="false" aria-label="Toggle navigation">
						<i className="fa-solid fa-bars"></i>
					</button>
					<div className="collapse navbar-collapse" id="navbarScroll">
						<ul className="navbar-nav me-auto my-2 my-lg-0 navbar-nav-scroll">
							<li className="nav-item">
								<span className="me-4 fs-3">Inicio</span>
							</li>
							<li className="nav-item">
								<span className="me-4 fs-3">Información personal</span>
							</li>
							<li className="nav-item">
								<span className="me-4 fs-3">Facturación</span>
							</li>
						</ul>
						<button className="btn btn-warning rounded-pill fs-4">Salir</button>
					</div>
				</div>
			</div>
		</nav >
	);
};