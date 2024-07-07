import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import LogButton from "../component/LogButton";
import { useContext } from "react";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";
import "../../styles/home.css";
import { ListProfRegCourses } from "../component/Card/ListProfREgCourses";
import { NavbarAdmin } from "./NavbarAdmin";
import { ListRegisteredCourses } from "../component/Card/ListRegisteredCourses";
import { MultiButton } from "../component/MultiButton";

export const RegisteredCourses = () => {
    const { store, actions } = useContext(Context)

    useEffect(() => {
        actions.getRegisteredCourses()
    }, [])

    console.log(store.registeredCourses)
    console.log(store.registeredCourses)

    return (
        <React.Fragment>
            <NavbarAdmin />
            <div className="container-fluid pb-5">
                <div className="d-flex align-content-center justify-content-center mb-3 mt-3 py-4 jumbo rounded-3">
                    <div className="container-fluid align-content-center">
                        <h4 className="py-2 ps-5 ms-5 fs-3 fw-bold">Cursos registrados</h4>
                    </div>
                </div>
                <div className="continer-fluid d-flex ps-5 ms-5">
                    <div className="cardProfessor justify-content-center" style={{ width: '18rem' }}>
                        <table className="table table-hover" style={{ width: '600px' }}>
                            <thead>
                                <tr>
                                    <th className="text-center" scope="col">N°</th>
                                    <th className="text-center" >Nombre del curso</th>
                                    <th className="text-center" >Nombre del estudiante</th>
                                    <th className="text-center" >Nombre del profesor</th>
                                </tr>
                            </thead>
                            <tbody>
                                {store.registeredCourses && store.registeredCourses.map(registeredCourse =>
                                    (<ListRegisteredCourses course={registeredCourse.course_id.name} professor={`${registeredCourse.professor_id.name}` + ' ' + `${registeredCourse.professor_id.last_name}`} student={`${registeredCourse.student_id.name}` + ' ' + `${registeredCourse.student_id.last_name}`} key={registeredCourse.new_course_id} id={registeredCourse.new_course_id} />)
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
                <div className="container-fluid d-flex my-3 justify-content-between">
                    <Link to="/newcourseregister" className="text-decoration-none ms-5">
                        <MultiButton color='purple' text='Registrar nuevo curso' width='220' />
                    </Link>
                    <Link to="/homeadmin" className="text-decoration-none me-5">
                        <MultiButton color='purple' text='Atrás' width='220' />
                    </Link>
                </div>
            </div>
        </React.Fragment>
    )
}