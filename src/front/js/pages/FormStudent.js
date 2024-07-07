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

    const navigate = useNavigate()
    const [formData, setFormData] = useState({
        name: store.singleStudent.student?.name,
        last_name: store.singleStudent.student?.last_name,
        cardID_type: store.singleStudent.student?.cardID_type,
        number_cardID: store.singleStudent.student?.number_cardID,
        email: store.singleStudent.student?.email,
        phone_number: store.singleStudent.student?.phone_number,
        province: "",
        canton: "",
        distric: ""
    })

    useEffect(() => {
        actions.getSingleStudent();
    }, [])

    console.log(store.singleStudent)
    console.log(store.singleStudent.student?.name)

    // const flag = store.isProfessorCreated

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value,
        }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        const isCreated = await actions.updateStudent(formData)
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
            <form className="mt-4 p-4 rounded shadow mb-4" style={{ backgroundColor: '#e9ecef' }} onSubmit={handleSubmit}>
                <h3 className="mb-3">Ingrese los datos</h3>
                <div className="d-flex mb-3">
                    <div className="me-2 flex-fill">
                        <label className="form-label">Nombre</label>
                        <input className="form-control" placeholder="Nombre" name="name" value={store.singleStudent.student?.name} onChange={handleInputChange} />
                    </div>
                    <div className="ms-2 flex-fill">
                        <label className="form-label">Apellido</label>
                        <input className="form-control" placeholder="Apellido" name="last_name" value={store.singleStudent.student?.last_name} onChange={handleInputChange} />
                    </div>
                </div>
                {/* <div className="mb-3">
                    <label className="form-label">Fecha de nacimiento</label>
                    <div className="d-flex">
                        <input className="form-control me-2" placeholder="Día" style={{ maxWidth: '80px' }} onChange={handleInputChange} />
                        <input className="form-control me-2" placeholder="Mes" style={{ maxWidth: '100px' }} onChange={handleInputChange} />
                        <input className="form-control" placeholder="Año" style={{ maxWidth: '100px' }} onChange={handleInputChange} />
                    </div>
                </div> */}
                <div className="mb-3">
                    <label className="form-label">Email</label>
                    <input className="form-control" placeholder="Email" name="email" value={store.singleStudent.student?.email} onChange={handleInputChange} />
                </div>
                <div className="mb-3">
                    <label className="form-label">Número telefónico</label>
                    <input className="form-control" placeholder="Número telefónico" name="phone_number" value={store.singleStudent.student?.phone_number} onChange={handleInputChange} />
                </div>
                <div className="d-flex mb-3">
                    <div className="me-2 flex-fill">
                    <label htmlFor="selectIdType" className="form-label">Tipo de Identificación</label>
    <select id="selectIdType" className="form-select" name="select">
        <option value="" disabled selected>Selecciona una opción</option>
        <option value="cedula">Cédula Nacional</option>
        <option value="dimex">DIMEX</option>
        <option value="pasaporte">Pasaporte</option>
                        </select>
                        {/* <input className="form-control" placeholder="Tipo de identificación" onChange={handleInputChange}/> */}
                    </div>
                    <div className="ms-2 flex-fill">
                        <label className="form-label">Número de identificación</label>
                        <input className="form-control" placeholder="Número de identificación" name="number_cardID" value={store.singleStudent.student?.number_cardID} onChange={handleInputChange} />
                    </div>
                </div>
                <div className="d-flex mb-3">
                    <div className="me-2 flex-fill">
                        <label className="form-label">Provincia</label>
                        <input className="form-control" placeholder="Provincia" name="province" value={formData.province} onChange={handleInputChange} />
                    </div>
                    <div className="me-2 flex-fill">
                        <label className="form-label">Cantón</label>
                        <input className="form-control" placeholder="Cantón" name="canton" value={formData.canton} onChange={handleInputChange} />
                    </div>
                    <div className="me-2 flex-fill">
                        <label className="form-label">Distrito</label>
                        <input className="form-control" placeholder="Distrito" name="distric" value={formData.distric} onChange={handleInputChange} />
                    </div>
                </div>
                {/* <hr />
                <div className="container d-flex-inline ps-0 mb-3 fst-italic" style={{ color: '#5751e1' }}>
                    <span>Gestiona tu contraseña</span>
                </div>
                <div className="mb-3">
                    <label className="form-label">Contraseña</label>
                    <input type="password" className="form-control" placeholder="Contraseña" onChange={handleInputChange} />
                </div>
                <div className="mb-4">
                    <label className="form-label">Confirmar contraseña</label>
                    <input type="password" className="form-control" placeholder="Confirmar contraseña" onChange={handleInputChange} />
                </div> */}
                <div className="container-fluid justify-content-between">
                    <button type="submit" className="btn btn-primary btn-sm">Guardar</button>
                    <Link to="/homestudent">
                        <button type="button" className="btn btn-warning btn-sm ms-5" style={{ borderRadius: '20px', boxShadow: '0px 4px 8px' }}>
                            Cancelar</button>
                    </Link>
                </div>
                {/* <div className="mb-4">
                    <button type="button" className="btn btn-primary btn-sm" onChange={handleSubmit}>Guardar</button>
                </div>
                <Link to={`/login`} className="mt-3">
                    ¿Ya tienes un usuario? Inicia sesión aquí</Link> */}
            </form>
        </div>
    );
};

export default FormStudent;
