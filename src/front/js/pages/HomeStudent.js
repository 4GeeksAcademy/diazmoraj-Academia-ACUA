import React, { useEffect, useState } from "react";
import { NavbarStudent } from "./NavbarStudent"
import "../../styles/home.css";
import { MultiButton } from "../component/MultiButton";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { Context } from "../store/appContext";
import { CardStudentCourses } from "../component/Card/CardStudentCourses";

export const HomeStudent = () => {
	const { store, actions } = useContext(Context)

	useEffect(() => {
		actions.getStudentCourses()
		actions.getSingleStudPay()
	}, [])

	console.log(store.studentCourses)
	console.log(store.singleStudPay)

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
					<>
						{store.studentCourses?.student_courses && store.studentCourses?.student_courses.map(studentCourse => {
							return (
								<CardStudentCourses course={studentCourse.course_name} professor={`${studentCourse.professor_name}` + ' ' + `${studentCourse.professor_last_name}`} key={studentCourse.new_course_id} id={studentCourse.new_course_id} />
							)
						})}
					</>

					{/* <div className="cardProfessor" style={{ width: '20rem' }}>
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
										<td className="fw-lighter fs-5 ps-3">Por definir</td>
									</tr>
								</table>
							</div>
						</div>
					</div> */}
				</div>
				{/* <div className="d-flex align-content-center justify-content-center mb-3 mt-3 py-4 jumbo rounded-3">
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
				</div> */}
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
									<td className="fw-lighter fs-4">{store.singleStudPay.student_payment?.date}</td>
								</tr>
								<tr className="pb-4">
									<td className="text-secondary fs-4 fw-semibold">Monto a pagar:</td>
									<td className="fw-lighter fs-4">{store.singleStudPay.student_payment?.mount}</td>
								</tr>
								{/* <tr>
									<td className="text-secondary fs-4 fw-semibold">Fecha vencimiento:</td>
									<td className="fw-lighter fs-4">05 Julio 2024</td>
								</tr> */}
							</table>
						</div>
					</div>
				</div>
			</div>
		</React.Fragment>
	)
}
