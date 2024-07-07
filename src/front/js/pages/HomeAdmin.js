import React, { useContext, useEffect } from "react";
import rigoImage from "../../img/rigo-baby.jpg";
import "../../styles/home.css";
import { NavbarAdmin } from "./NavbarAdmin";
import { MultiButton } from "../component/MultiButton";
import { Link } from "react-router-dom";
import { CardAdminProfessor } from "../component/Card/CardAdminProfessor";
import { ListAdminCourse } from "../component/Card/ListAdminCourse";
import { CardAdminStudent } from "../component/Card/CardAdminStudent";
import { Context } from "../store/appContext";
import { Carousel } from "../component/Carousel";
import { CarouselAdmin } from "../component/CarouselAdmin";
import { CarouselAdminStudents } from "../component/CarouselAdminStudents";


export const HomeAdmin = () => {

	const { store, actions } = useContext(Context);


	// useEffect(() => {
	// 	console.log("Se ejecuta getProfessors");
	// 	actions.getProfessors()
	// }, [])
	useEffect(() => {
		console.log("Se ejecuta por la dependencia")
	}, [store.professors])

	return (
		<React.Fragment>
			<NavbarAdmin />
			<div className="container-fluid pb-5">
				<div className="d-flex align-content-center justify-content-center mb-3 mt-3 py-4 jumbo rounded-3">
					<div className="container-fluid align-content-center">
						<h4 className="py-2 ps-5 ms-5 fs-3 fw-bold">Profesores</h4>
					</div>
				</div>
				<div className="container-fluid d-flex ms-5 ps-5">

					{/* <CarouselAdminProfessor /> */}

					{/* <CarouselAdmin array={store.professors} /> */}

					<>
						{store.professors && store.professors.map((professor) => {
							return (
								<CardAdminProfessor name={professor.name} last_name={professor.last_name} key={professor.number_cardID} id={professor.id} />
							)
						})}
					</>

				</div>
				<div className="container-fluid d-flex justify-content-center my-3">
					<Link to="/adminprofreg" className="text-decoration-none">
						<MultiButton color='purple' text='Agregar nuevo profesor' width='200' />
					</Link>
				</div>
				<div className="d-flex align-content-center justify-content-center mb-3 mt-3 py-4 jumbo rounded-3">
					<div className="container-fluid align-content-center">
						<h4 className="py-2 ps-5 ms-5 fs-3 fw-bold">Cursos</h4>
					</div>
				</div>
				<div className="continer-fluid d-flex ps-5 ms-5">

					<div className="cardProfessor" style={{ width: '18rem' }}>
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
						<Link to="/newcourse" className="text-decoration-none">
							<MultiButton color='purple' text='Agregar nuevo curso' width='200' />
						</Link>
					</div>
				</div>
				<div className="d-flex align-content-center justify-content-center mb-3 mt-3 py-4 jumbo rounded-3">
					<div className="container-fluid align-content-center">
						<h4 className="py-2 ps-5 ms-5 fs-3 fw-bold">Estudiantes</h4>
					</div>
				</div>
				<div className="continer-fluid d-flex ms-5 ps-5">

					{/* <CarouselAdminStudents array={store.students} /> */}
					<>
						{store.students && store.students.map((student) => {
							return (
								<CardAdminStudent name={student.name} last_name={student.last_name} key={student.number_carID} id={student.id} />
							)
						})}
					</>
				</div>
				<div className="container-fluid d-flex my-3 justify-content-center">
					<Link to="/adminstudreg" className="text-decoration-none">
						<MultiButton color='purple' text='Agregar nuevo estudiante' width='210' />
					</Link>
				</div>
			</div>
		</React.Fragment>
	)
}