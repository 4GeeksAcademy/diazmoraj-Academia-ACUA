import React, { useContext } from "react";
import rigoImage from "../../img/rigo-baby.jpg";
import "../../styles/home.css";
import { NavbarAdmin } from "./NavbarAdmin";
import { MultiButton } from "../component/MultiButton";
import { Link } from "react-router-dom";
import { CardAdminProfessor } from "../component/Card/CardAdminProfessor";
import { ListAdminCourse } from "../component/Card/ListAdminCourse";
import { CardAdminStudent } from "../component/Card/CardAdminStudent";
import { Context } from "../store/appContext";

export const HomeAdmin = () => {
	const { store, actions } = useContext(Context);

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
					<>
						{store.professors && store.professors.map((professor) => {
							return (
								<CardAdminProfessor name={professor.name} key={professor.number_cardID} id={professor.id} />
							)
						})}
					</>
					<div className="mt-auto ms-3">
						<Link to="/formprofessor" className="text-decoration-none">
							<MultiButton color='purple' text='Agregar nuevo profesor' width='200' />
						</Link>
					</div>
				</div>
				<div className="d-flex align-content-center justify-content-center mb-3 mt-3 py-4 jumbo rounded-3">
					<div className="container-fluid align-content-center">
						<h4 className="py-2 ps-5 ms-5 fs-3 fw-bold">Cursos</h4>
					</div>
				</div>
				<div className="continer-fluid d-flex ps-5 ms-5">

					<div className="cardProfessor" style={{ width: '20rem' }}>
						<table className="table table-hover">
							<thead>
								<tr>
									<th scope="col">N°</th>
									<th scope="col">Nombre del curso</th>
								</tr>
							</thead>
							<tbody>
								{store.courses && store.courses.map(course =>
									(<ListAdminCourse name={course.name} key={course.name} id={course.id} />)
								)}
							</tbody>
						</table>
					</div>

					<div className="mt-auto ms-3">
						<Link to="/formprofessor" className="text-decoration-none">
							<MultiButton color='purple' text='Agregar nuevo curso' width='200' />
						</Link>
					</div>
				</div>
				<div className="d-flex align-content-center justify-content-center mb-3 mt-3 py-4 jumbo rounded-3">
					<div className="container-fluid align-content-center">
						<h4 className="py-2 ps-5 ms-5 fs-3 fw-bold">Estudiantes</h4>
					</div>
				</div>
				<div className="continer-fluid d-flex ps-5 ms-5">
					{store.students && store.students.map((student, index) => {
						return (
							<CardAdminStudent name={student.name} key={student.number_carID} id={student.id} />
						)
					})}
					<div className="mt-auto ms-3">
						<Link to="/formstudent" className="text-decoration-none">
							<MultiButton color='purple' text='Agregar nuevo estudiante' width='210' />
						</Link>
					</div>
				</div>
			</div>
		</React.Fragment>
	)
}