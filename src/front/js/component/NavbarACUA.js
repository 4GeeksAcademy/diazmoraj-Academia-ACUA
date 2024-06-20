import React from "react";
import { Link } from "react-router-dom";
import LogButton from "./LogButton";
import { useState, useEffect } from "react";


export const NavbarACUA = () => {
	return (
		<nav className="navbar navbar-expand-lg bg-white">
			<div className="container-fluid">
				<a className="navbar-brand ps-5" href="#">
					<img src="https://i.imgur.com/fNjEl6I.png" alt="Bootstrap" className="logo" />
				</a>
				<div className="button me-4">
					<button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation" onChange={(e) => { console.log(e) }}>
						<i className="fa-solid fa-bars" style={{ fontSize: '35px' }}></i>
					</button>
				</div>
				<div className="collapse navbar-collapse justify-content-center" id="navbarNav" style={{
					gap: '300px',
					paddingRight: '45px'
				}}>
					<ul className="navbar-nav fw-semibold fs-6 flex-wrap-reverse justify-content-center mt-3">
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
						<li className="nav-item showButton"> <LogButton text="Login" /> </li>
					</ul>
				</div>
				<div className="loginButton pe-5 hiddeButton">
					<LogButton text="Login" />
				</div>
			</div>
		</nav >
	);
};
