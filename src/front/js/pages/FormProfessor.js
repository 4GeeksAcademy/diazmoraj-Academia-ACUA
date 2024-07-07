import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import LogButton from "../component/LogButton";
import useAuth from "../component/frontAuth/useAuth";
import { useContext } from "react";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";
import { showNotification } from "../utils/ShowNotification";

const FormProfessor = () => {

    const { store, actions } = useContext(Context)
    const { logout } = useAuth()

    const [professorData, setProfessorData] = useState({})

    useEffect(() => {
        actions.getSingleProfessor()
    }, [])

    console.log(store.singleProfessor)
    console.log(store.singleProfessor.professor?.name)

    const navigate = useNavigate()
    const [formData, setFormData] = useState({
        name: store.singleProfessor.professor?.name,
        last_name: store.singleProfessor.professor?.last_name,
        cardID_type: store.singleProfessor.professor?.cardID_type,
        number_cardID: store.singleProfessor.professor?.number_cardID,
        email: store.singleProfessor.professor?.email,
        phone_number: store.singleProfessor.professor?.phone_number,
        province: "",
        canton: "",
        distric: ""
    })

    useEffect(() => {
        actions.getSingleProfessor();
    }, [])

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value,
        }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        const isCreated = await actions.updateProfessor(formData)
        console.log(isCreated)
        if (isCreated) {
            showNotification("Datos modificados con éxito")
            navigate("/homeprofessor")
        } else {
            showNotification("Ocurrió un error al tratar de modificar tu información", "error")
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
                    <h4 className="fw-lighter fst-italic">{store.singleProfessor.professor?.name} {store.singleProfessor.professor?.last_name}</h4>
                </div>
            </div>
            <form className="mt-4 p-4 rounded shadow mb-4" style={{ backgroundColor: '#e9ecef' }} onSubmit={handleSubmit}>
                <h3 className="mb-3">Ingrese los datos</h3>
                <div className="d-flex mb-3">
                    <div className="me-2 flex-fill">
                        <label className="form-label">Nombre</label>
                        <input className="form-control" value={store.singleProfessor.professor?.name} placeholder="Nombre" name="name" onChange={handleInputChange} />
                    </div>
                    <div className="ms-2 flex-fill">
                        <label className="form-label">Apellido</label>
                        <input className="form-control" placeholder="Apellido" value={store.singleProfessor.professor?.last_name} name="last_name" onChange={handleInputChange} />
                    </div>
                </div>
                {/* <div className="mb-3">
                    <label className="form-label">Fecha de nacimiento</label>
                    <div className="d-flex">
                        <input className="form-control me-2" placeholder="Día" style={{ maxWidth: '80px' }} onClick={handleInputChange} />
                        <input className="form-control me-2" placeholder="Mes" style={{ maxWidth: '100px' }} onClick={handleInputChange} />
                        <input className="form-control" placeholder="Año" style={{ maxWidth: '100px' }} onClick={handleInputChange} />
                    </div>
                </div> */}
                <div className="mb-3">
                    <label className="form-label">Email</label>
                    <input className="form-control" placeholder="Email" value={store.singleProfessor.professor?.email} name="email" onChange={handleInputChange} />
                </div>
                <div className="mb-3">
                    <label className="form-label">Número telefónico</label>
                    <input className="form-control" placeholder="Número telefónico" value={store.singleProfessor.professor?.phone_number} name="phone_number" onChange={handleInputChange} />
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
                        {/* <input className="form-control" placeholder="Tipo de identificación" onClick={handleInputChange}/> */}
                    </div>
                    <div className="ms-2 flex-fill">
                        <label className="form-label">Número de identificación</label>
                        <input className="form-control" placeholder="Número de identificación" value={store.singleProfessor.professor?.number_cardID} name="number_cardID" onChange={handleInputChange} />
                    </div>
                </div>
                <div className="d-flex mb-3">
                    <div className="me-2 flex-fill">
                        <label className="form-label">Provincia</label>
                        <input className="form-control" placeholder="Provincia" name="province" onChange={handleInputChange} />
                    </div>
                    <div className="me-2 flex-fill">
                        <label className="form-label">Cantón</label>
                        <input className="form-control" placeholder="Cantón" name="canton" onChange={handleInputChange} />
                    </div>
                    <div className="me-2 flex-fill">
                        <label className="form-label">Distrito</label>
                        <input className="form-control" placeholder="Distrito" name="distric" onChange={handleInputChange} />
                    </div>
                </div>
                {/* <hr />
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
                </div> */}
                <div className="container-fluid justify-content-between">
                    <button type="submit" className="btn btn-primary btn-sm">Guardar</button>
                    {/* <Link to={`/login`} className="mt-3 ms-5 me-5">
                        ¿Ya tienes un usuario? Inicia sesión aquí
                    </Link> */}
                    <Link to="/homeprofessor">
                        <button type="button" className="btn btn-warning btn-sm ms-5">Cancelar</button>
                    </Link>
                </div>
            </form>
        </div>
    );
};

export default FormProfessor;
