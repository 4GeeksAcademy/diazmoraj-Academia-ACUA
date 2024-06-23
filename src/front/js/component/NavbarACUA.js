import React from "react";
import { Link } from "react-router-dom";
import LogButton from "./LogButton";
import { useState, useEffect } from "react";


export const NavbarACUA = () => {
	return (
		<nav className="navbar navbar-expand-lg bg-white pt-3">
			<div className="container-fluid">
				<span className="navbar-brand ps-4" href="#">
					<img src="https://i.imgur.com/RPBpym9.png" alt="Bootstrap" className="logo" />
				</span>
				<div className="button me-5">
					<button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation" onChange={(e) => { console.log(e) }}>
						<i className="fa-solid fa-bars" style={{ fontSize: '35px' }}></i>
					</button>
				</div>
				<div className="collapse navbar-collapse justify-content-center" id="navbarNav" style={{
					paddingRight: '75px'
				}}>
					<ul className="navbar-nav fw-semibold fs-6 flex-wrap-reverse justify-content-center mt-3 portraitPrimaryColor">
						<li className="nav-item">
							<p className="nav-link" aria-current="page" href="#">Inicio</p>
						</li>
						<li className="nav-item">
							<p className="nav-link" href="#">Planes</p>
						</li>
						<li className="nav-item">
							<p className="nav-link" href="#">Sobre Nosotros</p>
						</li>
						<li className="nav-item">
							<p className="nav-link" href="#">Contacto</p>
						</li>
						<Link to='/login' className="text-decoration-none">
							<li className="nav-item liLoginButton">
								<LogButton text="Login" /> '
							</li>
						</Link>
					</ul>
				</div>
				<div className=" externalLoginButton me-5">
					<Link to="/login" className="text-decoration-none">
						<LogButton text="Login" />
					</Link>
				</div>
			</div>
		</nav >
	);
};
