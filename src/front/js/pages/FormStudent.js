import React, { useEffect, useState } from "react";
import { useContext } from "react";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { MultiButton } from "../component/MultiButton";
import { showNotification } from "../utils/ShowNotification";
import useAuth from "../component/frontAuth/useAuth";

const FormStudent = () => {
    const { store, actions } = useContext(Context)

    const [studentData, setStudentData] = useState({})

    useEffect(() => {
        actions.getSingleStudent();
        // actions.updateStudent()
    }, [])

    console.log(store.singleStudent)
    console.log(store.singleStudent.student?.name)

    const navigate = useNavigate()
    const [formData, setFormData] = useState({
        name: "",
        last_name: "",
        cardID_type: "",
        number_cardID: 0,
        email: "",
        phone_number: 0,
        password: ""
    })


    useEffect(() => { }, [])

    // const flag = store.isProfessorCreated

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value,
        }))
    }

    const handleSubmit = async () => {
        const isCreated = await actions.newStudent(formData)
        console.log(isCreated)
        if (isCreated) {
            showNotification("Datos modificados con éxito")
            navigate("/homestudent")
        } else {
            showNotification("Ocurrió un error al tratar de modificar tu información", "error")
            // navigate('/homestudent')
        }
    }

    return (
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
                    color: '#5751e1'
                }}>
                    <h2>¡ Bienvenid@ a tu perfil !</h2>
                    <hr />
                    <h4 className="fw-lighter fst-italic">{store.singleStudent.student?.name} {store.singleStudent.student?.last_name}</h4>
                </div>
            </div>
            <form className="mt-4 p-4 rounded shadow mb-4" style={{ backgroundColor: '#e9ecef' }}>
                <h3 className="mb-3">Ingrese los datos</h3>
                <div className="d-flex mb-3">
                    <div className="me-2 flex-fill">
                        <label className="form-label">Nombre</label>
                        <input className="form-control" placeholder="Nombre" value={store.singleStudent.student?.name} onClick={handleInputChange} />
                    </div>
                    <div className="ms-2 flex-fill">
                        <label className="form-label">Apellido</label>
                        <input className="form-control" placeholder="Apellido" value={store.singleStudent.student?.last_name} onClick={handleInputChange} />
                    </div>
                </div>
                <div className="mb-3">
                    <label className="form-label">Fecha de nacimiento</label>
                    <div className="d-flex">
                        <input className="form-control me-2" placeholder="Día" style={{ maxWidth: '80px' }} onClick={handleInputChange} />
                        <input className="form-control me-2" placeholder="Mes" style={{ maxWidth: '100px' }} onClick={handleInputChange} />
                        <input className="form-control" placeholder="Año" style={{ maxWidth: '100px' }} onClick={handleInputChange} />
                    </div>
                </div>
                <div className="mb-3">
                    <label className="form-label">Email</label>
                    <input className="form-control" placeholder="Email" value={store.singleStudent.student?.email} onClick={handleInputChange} />
                </div>
                <div className="mb-3">
                    <label className="form-label">Número telefónico</label>
                    <input className="form-control" placeholder="Número telefónico" value={store.singleStudent.student?.phone_number} onClick={handleInputChange} />
                </div>
                <div className="d-flex mb-3">
                    <div className="me-2 flex-fill">
                        <label className="form-label">Tipo de identificación</label><br></br>
                        <select name="select">
                            <option value="value1" selected>-----------</option>
                            <option value="value2">Cedula Nacional</option>
                            <option value="value3">DIMEX</option>
                            <option value="value3">Pasaporte</option>
                        </select>
                        {/* <input className="form-control" placeholder="Tipo de identificación" onClick={handleInputChange}/> */}
                    </div>
                    <div className="ms-2 flex-fill">
                        <label className="form-label">Número de identificación</label>
                        <input className="form-control" placeholder="Número de identificación" value={store.singleStudent.student?.number_cardID} onClick={handleInputChange} />
                    </div>
                </div>
                <div className="d-flex mb-3">
                    <div className="me-2 flex-fill">
                        <label className="form-label">Provincia</label>
                        <input className="form-control" placeholder="Provincia" onClick={handleInputChange} />
                    </div>
                    <div className="me-2 flex-fill">
                        <label className="form-label">Cantón</label>
                        <input className="form-control" placeholder="Cantón" onClick={handleInputChange} />
                    </div>
                    <div className="me-2 flex-fill">
                        <label className="form-label">Distrito</label>
                        <input className="form-control" placeholder="Distrito" onClick={handleInputChange} />
                    </div>
                </div>
                <hr />
                <div className="container d-flex-inline ps-0 mb-3 fst-italic" style={{ color: '#5751e1' }}>
                    <span>Gestiona tu contraseña</span>
                </div>
                <div className="mb-3">
                    <label className="form-label">Contraseña</label>
                    <input type="password" className="form-control" placeholder="Contraseña" onClick={handleInputChange} />
                </div>
                <div className="mb-4">
                    <label className="form-label">Confirmar contraseña</label>
                    <input type="password" className="form-control" placeholder="Confirmar contraseña" onClick={handleInputChange} />
                </div>
                <div className="container-fluid justify-content-between">
                    <button type="button" className="btn btn-primary btn-sm" onClick={handleSubmit}>Guardar</button>
                    <Link to={`/login`} className="mt-3 ms-5 me-5">
                        ¿Ya tienes un usuario? Inicia sesión aquí
                    </Link>
                    <Link to="/homestudent">
                        <button type="button" className="btn btn-warning btn-sm ms-5">Cancelar</button>
                    </Link>
                </div>
                {/* <div className="mb-4">
                    <button type="button" className="btn btn-primary btn-sm" onClick={handleSubmit}>Guardar</button>
                </div>
                <Link to={`/login`} className="mt-3">
                    ¿Ya tienes un usuario? Inicia sesión aquí</Link> */}
            </form>
        </div>
    );
};

export default FormStudent;
