import React from "react";
import rigoImage from "../../img/rigo-baby.jpg";
import "../../styles/home.css";
import { NavbarAdmin } from "./NavbarAdmin";

export const HomeAdmin = () => {
	return (
		<React.Fragment>
			<NavbarAdmin />
			<div className="container-fluid">
				<div className="d-flex align-content-center justify-content-center mb-3 mt-3 py-4 jumbo rounded-3">
					<div className="container-fluid align-content-center">
						<h4 className="py-2 ps-5 ms-5 fs-3 fw-bold">Profesores</h4>
					</div>
				</div>
				<div className="continer-fluid d-flex ps-5 ms-5">
					<div>
						<div className="card" style={{ width: '14rem' }}>
							<div className="card-header fs-5 fw-bold">
								Roberto Antillón
							</div>
							<img src="https://cdn3.iconfinder.com/data/icons/books-and-reading/512/Artboard_2_copy_3-512.png" className="card-img-top" />
							<div className="card-body">
								<table className="table table-borderless">
									<tr>
										<td className="text-secondary fs-6 fw-semibold">Profesor</td>
										<td className="fw-lighter fs-6">Roberto Antillón</td>
									</tr>
								</table>
							</div>
						</div>
					</div>
					<div className="mt-auto ms-3">
						<button type="button" className="btn btn-warning text-wrap fw-lighter text-dark text-start rounded-pill" style={{ width: '11rem' }}>Nuevo profesor<i className=" ms-2 fa-solid fa-plus"></i></button>
					</div>
				</div>
				<div className="d-flex align-content-center justify-content-center mb-3 mt-3 py-4 jumbo rounded-3">
					<div className="container-fluid align-content-center">
						<h4 className="py-2 ps-5 ms-5 fs-3 fw-bold">Cursos</h4>
					</div>
				</div>
				<div className="continer-fluid d-flex ps-5 ms-5">
					<div className="card" style={{ width: '14rem' }}>
						<div className="container card-header fw-bold">
							<div className="row">
								<div className="col">
									<span className="fs-5">Guitarra eléctrica</span>
								</div>
							</div>
						</div>
						<img src="https://images-na.ssl-images-amazon.com/images/I/71Oo2ZKroFL._AC_SL1500_.jpg" className="card-img-top" />
					</div>
					<div className="mt-auto ms-3">
						<button type="button" className="btn btn-warning text-wrap fw-lighter text-dark text-start rounded-pill" style={{ width: '11rem' }}>Nuevo curso<i className=" ms-2 fa-solid fa-plus"></i></button>
					</div>
				</div>
				<div className="d-flex align-content-center justify-content-center mb-3 mt-3 py-4 jumbo rounded-3">
					<div className="container-fluid align-content-center">
						<h4 className="py-2 ps-5 ms-5 fs-3 fw-bold">Estudiantes</h4>
					</div>
				</div>
				<div className="continer-fluid d-flex ps-5 ms-5">
					<div>
						<div className="card" style={{ width: '14rem' }}>
							<div className="card-header fs-5 fw-bold">
								Greiza García
							</div>
							<img src="https://cdn3.iconfinder.com/data/icons/books-and-reading/512/Artboard_2_copy_3-512.png" className="card-img-top" />
							<div className="card-body">
								<table className="table table-borderless">
									<tr>
										<td className="text-secondary fs-6 fw-semibold">Curso</td>
										<td className="fw-lighter fs-6">Guitarra eléctrica</td>
									</tr>
								</table>
							</div>
						</div>
					</div>
					<div className="mt-auto ms-3">
						<button type="button" className="btn btn-warning text-wrap fw-lighter text-dark text-start rounded-pill" style={{ width: '11rem' }}>Nuevo estudiante<i className=" ms-2 fa-solid fa-plus"></i></button>
					</div>
				</div>
			</div>
		</React.Fragment>
	)
}