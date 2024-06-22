import React from "react";
import { NavbarStudent } from "./NavbarStudent"
import "../../styles/home.css";
import { MultiButton } from "../component/MultiButton";

export const HomeStudent = () => {
	return (
		<React.Fragment>
			<NavbarStudent />
			<div className="container-fluid pb-5">
				<div className="d-flex align-content-center justify-content-center mb-3 mt-3 py-4 jumbo rounded-3">
					<div className="container-fluid align-content-center">
						<h4 className="py-2 ps-5 ms-5 fs-3 fw-bold">Mis Cursos</h4>
					</div>
				</div>
				<div className="continer-fluid d-flex ps-5 ms-5">
					<div className="cardProfessor" style={{ width: '20rem' }}>
						<div className="card cardProff" style={{ borderRadius: '20px' }}>
							<div className="card-body">
								<p className="card-title fs-5 text-center mediumWeight">Guitarra eléctrica</p>
								<table className="table table-borderless">
									<tr className="pb-3">
										<td className="text-secondary fs-5 fw-semibold">Profesor:</td>
										<td className="fw-lighter fs-5 ps-3">Roberto Antillón</td>
									</tr>
									<tr>
										<td className="text-secondary fs-5 fw-semibold">Modalidad:</td>
										<td className="fw-lighter fs-5 ps-3">Presencial</td>
									</tr>
								</table>
							</div>
						</div>
					</div>
					<div className="mt-auto ms-3">
						<MultiButton color='purple' text='Solicitar inscribir nuevo curso' width='240' />
					</div>
				</div>
				<div className="d-flex align-content-center justify-content-center mb-3 mt-3 py-4 jumbo rounded-3">
					<div className="container-fluid align-content-center">
						<h4 className="py-2 ps-5 ms-5 fs-3 fw-bold">Mis Profesores</h4>
					</div>
				</div>
				<div className="continer-fluid d-flex ps-5 ms-5">
					<div className="cardProfessor" style={{ width: '20rem' }}>
						<div className="card cardProff" style={{ borderRadius: '20px' }}>
							<div className="container d-flex justify-content-end mt-2">
								<MultiButton color='purple' text='Ver más' width='100' />
							</div>
							<img src="https://i.imgur.com/qTL6olW.png" className="card-img-top" alt="..." style={{ height: 'auto', padding: '30px' }} />
							<div className="card-body">
								<p className="card-title fs-5 mediumWeight text-center">Roberto Antillón</p>
								<ul className="list-group list-group-flush">
									<li className="list-group-item text-secondary" style={{ fontSize: '15px' }}>Curso: Guitarra eléctrica</li>
								</ul>
							</div>
						</div>
					</div>
				</div>
				<div className="d-flex align-content-center justify-content-center mb-3 mt-3 py-4 jumbo rounded-3">
					<div className="container-fluid align-content-center">
						<h4 className="py-2 ps-5 ms-5 fs-3 fw-bold">Mi próximo pago</h4>
					</div>
				</div>
				<div className="continer-fluid d-flex ps-5 ms-5 my-5">
					<div className="cardProfessor" style={{ width: '28rem' }}>
						<div className="container d-flex card-body card cardProff" style={{ borderRadius: '20px' }}>
							<table className="table table-borderless text-end">
								<tr className="pb-4">
									<td className="text-secondary fs-4 fw-semibold">Fecha pago:</td>
									<td className="fw-lighter fs-4">30 Junio 2024</td>
								</tr>
								<tr className="pb-4">
									<td className="text-secondary fs-4 fw-semibold">Monto a pagar:</td>
									<td className="fw-lighter fs-4">₡ 75.000</td>
								</tr>
								<tr>
									<td className="text-secondary fs-4 fw-semibold">Fecha vencimiento:</td>
									<td className="fw-lighter fs-4">05 Julio 2024</td>
								</tr>
							</table>
						</div>
					</div>
				</div>
			</div>
		</React.Fragment>
	)
}
