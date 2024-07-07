import React, { useState } from "react";
import { useContext } from "react";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { MultiButton } from "../component/MultiButton";
import { showNotification } from "../utils/ShowNotification";

const AdminProfReg = () => {

    const navigate = useNavigate()
    const { store, actions } = useContext(Context)
    const [formData, setFormData] = useState({
        name: "",
        last_name: "",
        cardID_type: "",
        number_cardID: 0,
        email: "",
        phone_number: 0,
        password: ""
    })

    // const flag = store.isProfessorCreated

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value,
        }))
    }

    const handleSubmit = async () => {
        // event.preventDefault();
        const isCreated = await actions.newProfessor(formData)
        console.log(isCreated)
        if (isCreated) {
            showNotification("Profesor creado con éxito")
            navigate("/homeadmin")
        } else {
            showNotification("Ocurrió un error al tratar de agregar un profesor", "error")
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
                    color: 'black'
                }}>
                    <h1>Registro de nuevo profesor</h1>
                </div>
            </div>
            <form className="mt-4 p-4 rounded shadow mb-4" style={{ backgroundColor: '#e9ecef' }}>
                <h3 className="mb-3">Ingrese los datos</h3>
                <div className="d-flex mb-3">
                    <div className="me-2 flex-fill">
                        <label className="form-label">Nombre</label>
                        <input className="form-control" placeholder="Nombre" name="name" value={formData.name} onChange={handleInputChange} />
                    </div>
                    <div className="ms-2 flex-fill">
                        <label className="form-label">Apellido</label>
                        <input className="form-control" placeholder="Apellido" name="last_name" value={formData.last_name} onChange={handleInputChange} />
                    </div>
                </div>
                <div className="mb-3">
                    <label className="form-label">Email</label>
                    <input className="form-control" placeholder="Email" name="email" value={formData.email} onChange={handleInputChange} />
                </div>
                <div className="mb-3">
                    <label className="form-label">Número telefónico</label>
                    <input className="form-control" placeholder="Número telefónico" name="phone_number" value={formData.phone_number} onChange={handleInputChange} />
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

                        {/*<input className="form-control" placeholder="Tipo de identificación" name="cardID_type" value={formData.cardID_type} onChange={handleInputChange}*/}
                    </div>
                    <div className="ms-2 flex-fill">
                        <label className="form-label">Número de identificación</label>
                        <input className="form-control" placeholder="Número de identificación" name="number_cardID" value={formData.number_cardID} onChange={handleInputChange} />
                    </div>
                </div>
                <div className="mb-3">
                    <label className="form-label">Contraseña</label>
                    <input type="password" className="form-control" placeholder="Contraseña" name="password" value={formData.password} onChange={handleInputChange} />
                </div>
                <div className="mb-4">
                    <label className="form-label">Confirmar contraseña</label>
                    <input type="password" className="form-control" placeholder="Confirmar contraseña" />
                </div>
                <div className=" container d-flex justify-content-center mb-3">
                    <button type="button" className="btn btn-primary" onClick={handleSubmit}>Guardar</button>

                    {/* <Link className="text-decoration-none" to="/homeadmin"> */}
                    {/* <MultiButton color='purple' text='Guardar' width='200' /> */}
                    {/* </Link> */}
                </div>
            </form>
        </div>
    );
};

export default AdminProfReg;
