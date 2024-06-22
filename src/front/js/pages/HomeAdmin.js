import React from "react";
import rigoImage from "../../img/rigo-baby.jpg";
import "../../styles/home.css";
import { NavbarAdmin } from "./NavbarAdmin";
import { MultiButton } from "../component/MultiButton";

export const HomeAdmin = () => {
	return (
		<React.Fragment>
			<NavbarAdmin />
			<div className="container-fluid pb-5">
				<div className="d-flex align-content-center justify-content-center mb-3 mt-3 py-4 jumbo rounded-3">
					<div className="container-fluid align-content-center">
						<h4 className="py-2 ps-5 ms-5 fs-3 fw-bold">Profesores</h4>
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
								{/* <ul className="list-group list-group-flush">
									<li className="list-group-item text-secondary" style={{ fontSize: '15px' }}>Curso: Guitarra eléctrica</li>
								</ul> */}
							</div>
						</div>
					</div>
					<div className="mt-auto ms-3">
						<MultiButton color='purple' text='Agregar nuevo profesor' width='200' />
					</div>
				</div>
				<div className="d-flex align-content-center justify-content-center mb-3 mt-3 py-4 jumbo rounded-3">
					<div className="container-fluid align-content-center">
						<h4 className="py-2 ps-5 ms-5 fs-3 fw-bold">Cursos</h4>
					</div>
				</div>
				<div className="continer-fluid d-flex ps-5 ms-5">
					<div className="cardProfessor" style={{ width: '20rem' }}>
						<table class="table table-hover">
							<thead>
								<tr>
									<th scope="col">N°</th>
									<th scope="col">Nombre del curso</th>
								</tr>
							</thead>
							<tbody>
								<tr className="table-row">
									<th scope="row">1</th>
									<td>Guitarra Eléctrica</td>
								</tr>
								<tr className="table-row">
									<th scope="row">2</th>
									<td>Piano</td>
								</tr>
								<tr className="table-row">
									<th scope="row">3</th>
									<td colspan="2">Canto lírico</td>
								</tr>
							</tbody>
						</table>
					</div>
					<div className="mt-auto ms-3">
						<MultiButton color='purple' text='Agregar nuevo curso' width='200' />
					</div>
				</div>
				<div className="d-flex align-content-center justify-content-center mb-3 mt-3 py-4 jumbo rounded-3">
					<div className="container-fluid align-content-center">
						<h4 className="py-2 ps-5 ms-5 fs-3 fw-bold">Estudiantes</h4>
					</div>
				</div>
				<div className="continer-fluid d-flex ps-5 ms-5">
					<div className="cardProfessor" style={{ width: '20rem' }}>
						<div className="card cardProff" style={{ borderRadius: '20px' }}>
							<img src="https://i.imgur.com/qTL6olW.png" className="card-img-top" alt="..." style={{ height: 'auto', padding: '30px' }} />
							<div className="card-body">
								<p className="card-title fs-5 mediumWeight text-center">Greiza García</p>
								{/* <ul className="list-group list-group-flush">
									<li className="list-group-item text-secondary" style={{ fontSize: '15px' }}>Curso: Guitarra eléctrica</li>
								</ul> */}
							</div>
						</div>
					</div>
					<div className="mt-auto ms-3">
						<MultiButton color='purple' text='Agregar nuevo estudiante' width='210' />
					</div>
				</div>
			</div>
		</React.Fragment>
	)
}