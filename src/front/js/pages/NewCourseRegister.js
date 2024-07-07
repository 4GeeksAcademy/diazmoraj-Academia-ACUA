import React, { useEffect, useState } from "react";
import { useContext } from "react";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { MultiButton } from "../component/MultiButton";
import { showNotification } from "../utils/ShowNotification";

export const NewCourseRegister = () => {

    const navigate = useNavigate()
    const { store, actions } = useContext(Context)
    const [formData, setFormData] = useState({
        professor_id: 0,
        course_id: 0,
        student_id: 0
    })

    const [searchStudentTerm, setSearchStudentTerm] = useState("")
    const [studentOptions, setStudentOptions] = useState([])
    const [selectedStudentOption, setSelectedStudentOption] = useState(null)

    const [searchProfessorTerm, setSearchProfessorTerm] = useState("")
    const [professorOptions, setProfessorOptions] = useState([])
    const [selectedProfessorOption, setSelectedProfessorOption] = useState(null)

    const [searchCourseTerm, setSearchCourseTerm] = useState("")
    const [courseOptions, setCourseOptions] = useState([])
    const [selectedCourseOption, setSelectedCourseOption] = useState(null)

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value,

        }))
    }

    const handleSubmit = async () => {
        // event.preventDefault();
        const isCreated = await actions.newCourseRegistration(formData)
        console.log(isCreated)
        if (isCreated) {
            showNotification("Nuevo curso registrado con éxito")
            navigate("/registeredcourses")
        } else {
            showNotification("Ocurrió un error al tratar de registrar un nuevo curso", "error")
        }

    }

    const handleSelectStudentChange = (e) => {
        const selectedStudentId = e.target.value
        const selectedStudentObj = studentOptions.find(studentOption => studentOption.id === parseInt(selectedStudentId))
        console.log(selectedStudentObj)
        setSelectedStudentOption(selectedStudentObj)
        setFormData({
            ...formData,
            // course_id: selectedObj?.id,
            // professor_id: selectedObj?.id,
            student_id: selectedStudentObj?.id
        })
    }

    const handleSelectProfessorChange = (e) => {
        const selectedProfessorId = e.target.value
        const selectedProfessorObj = professorOptions.find(professorOption => professorOption.id === parseInt(selectedProfessorId))
        console.log(selectedProfessorObj)
        setSelectedProfessorOption(selectedProfessorObj)
        setFormData({
            ...formData,
            // course_id: selectedObj?.id,
            professor_id: selectedProfessorObj?.id
            // student_id: selectedStudentObj?.id
        })
    }

    const handleSelectCourseChange = (e) => {
        const selectedCourseId = e.target.value
        const selectedCourseObj = courseOptions.find(courseOption => courseOption.id === parseInt(selectedCourseId))
        console.log(selectedCourseObj)
        setSelectedCourseOption(selectedCourseObj)
        setFormData({
            ...formData,
            course_id: selectedCourseObj?.id
            // professor_id: selectedObj?.id,
            // student_id: selectedStudentObj?.id
        })
    }

    useEffect(() => {
        if (searchStudentTerm.length > 0) {
            const searchStudent = async () => {
                try {
                    const response = await fetch(`${process.env.BACKEND_URL}/api/search/students`, {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ 'term': searchStudentTerm })
                    });
                    if (response.ok) {
                        const data = await response.json()
                        setStudentOptions(data.result)
                    } else {
                        console.log("Error obteniendo data")
                    }
                } catch (error) {
                    console.log("Error obteniendo data", error)
                }
            };
            searchStudent()
        } else {
            setStudentOptions([])
        }
    }, [searchStudentTerm])

    useEffect(() => {
        if (searchProfessorTerm.length > 0) {
            const searchProfessor = async () => {
                try {
                    const response = await fetch(`${process.env.BACKEND_URL}/api/search/professors`, {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ 'term': searchProfessorTerm })
                    });
                    if (response.ok) {
                        const data = await response.json()
                        setProfessorOptions(data.result)
                    } else {
                        console.log("Error obteniendo data")
                    }
                } catch (error) {
                    console.log("Error obteniendo data", error)
                }
            };
            searchProfessor()
        } else {
            setProfessorOptions([])
        }
    }, [searchProfessorTerm])

    useEffect(() => {
        if (searchCourseTerm.length > 0) {
            const searchCourse = async () => {
                try {
                    const response = await fetch(`${process.env.BACKEND_URL}/api/search/courses`, {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ 'term': searchCourseTerm })
                    });
                    if (response.ok) {
                        const data = await response.json()
                        setCourseOptions(data.result)
                    } else {
                        console.log("Error obteniendo data")
                    }
                } catch (error) {
                    console.log("Error obteniendo data", error)
                }
            };
            searchCourse()
        } else {
            setCourseOptions([])
        }
    }, [searchCourseTerm])

    return (
        <React.Fragment>
            <div className="d-flex flex-column justify-content-center align-items-center"
                style={{ backgroundColor: '#f8f9fa' }}>
                <div style={{ position: 'relative', width: '100%' }}>
                    <img src="https://i.postimg.cc/XJ784zpy/Whats-App-Image-2024-06-17-at-19-29-08.jpg"
                        alt="Jumbotron" className="img-fluid mb-3" style={{
                            width: '100%', maxHeight: '150px',
                            objectFit: 'cover'
                        }} />
                    <div style={{
                        position: 'absolute', top: '50%', left: '35%', transform: 'translate(-45%, -50%)',
                        color: 'black'
                    }}>
                        <h1>Registrar nuevo curso</h1>
                    </div>
                </div>
                <form className="mt-5 p-5 rounded shadow mb-5" style={{ backgroundColor: '#e9ecef' }}>
                    <div className="d-flex mb-3 row">
                        <div className="me-2 flex-fill">
                            <>
                                <label htmlFor="searchStudentInput" className="form-label fs-4 mb-3" style={{ color: '#5751e1' }}>
                                    Seleccionar estudiante
                                </label>
                                <input
                                    className="form-control mb-3"
                                    type="text"
                                    id="searchStudentInput"
                                    placeholder="Buscar estudiante"
                                    value={searchStudentTerm}
                                    onChange={(e) => { setSearchStudentTerm(e.target.value) }}
                                />
                                <select id="selectStudentInput" className="form-control" value={selectedStudentOption ? selectedStudentOption.id : ""} onChange={handleSelectStudentChange}>
                                    <option value="">Seleccionar estudiante</option>
                                    {studentOptions.map((studentOption) => {
                                        return <option key={studentOption.id} value={studentOption.id}>{studentOption.name} {studentOption.last_name}</option>
                                    })}
                                </select>
                            </>
                            {/* <label className="form-label fs-4 mb-3" style={{ color: '#5751e1' }}>ID estudiante</label>
                            <input className="form-control mb-3" placeholder="ID estudiante" name="student_id" value={formData.student_id} onChange={handleInputChange} /> */}
                        </div>
                        <div className="me-2 flex-fill">
                            <>
                                <label htmlFor="searchProfessorInput" className="form-label fs-4 mb-3" style={{ color: '#5751e1' }}>
                                    Buscar profesor
                                </label>
                                <input
                                    className="form-control mb-3"
                                    type="text"
                                    id="searchProfessorInput"
                                    placeholder="Buscar profesor"
                                    value={searchProfessorTerm}
                                    onChange={(e) => { setSearchProfessorTerm(e.target.value) }}
                                />
                                <select id="selectProfessorInput" className="form-control" value={selectedProfessorOption ? selectedProfessorOption.id : ""} onChange={handleSelectProfessorChange}>
                                    <option value="">Seleccionar profesor</option>
                                    {professorOptions.map((professorOption) => {
                                        return <option key={professorOption.id} value={professorOption.id}>{professorOption.name} {professorOption.last_name}</option>
                                    })}
                                </select>
                            </>
                        </div>
                        <div className="me-2 flex-fill">
                            <>
                                <label htmlFor="searchCourseInput" className="form-label fs-4 mb-3" style={{ color: '#5751e1' }}>
                                    Buscar curso
                                </label>
                                <input
                                    className="form-control mb-3"
                                    type="text"
                                    id="searchCourseInput"
                                    placeholder="Buscar curso"
                                    value={searchCourseTerm}
                                    onChange={(e) => { setSearchCourseTerm(e.target.value) }}
                                />
                                <select id="selectCourseInput" className="form-control" value={selectedCourseOption ? selectedCourseOption.id : ""} onChange={handleSelectCourseChange}>
                                    <option value="">Seleccionar curso</option>
                                    {courseOptions.map((courseOption) => {
                                        return <option key={courseOption.id} value={courseOption.id}>{courseOption.name} {courseOption.last_name}</option>
                                    })}
                                </select>
                            </>
                        </div>
                    </div>
                    <div className="d-flex justify-content-between">
                        <button type="button" className="btn btn-primary" onClick={handleSubmit}>Guardar</button>
                        {/* <Link to="/homeadmin" className="text-decoration-none">
                            <MultiButton color='purple' text='Volver' width='100' onClick={handleSubmit} />
                        </Link>
                        <MultiButton color='purple' text='Guardar' width='100' onClick={handleSubmit} /> */}
                        <Link to="/registeredcourses" className="text-decoration-none">
                            <button type="button" className="btn btn-warning">Cancelar</button>
                        </Link>
                    </div>
                </form>
            </div>
        </React.Fragment>
    );
};