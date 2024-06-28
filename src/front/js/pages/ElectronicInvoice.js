import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";
import { number } from "prop-types";

export const ElectronicInvoice = () => {

  const navigate = useNavigate()
  const {store, actions} = useContext(Context)
  const [formData, setFormData] = useState({
    name: "",
    cardID_type: "",
    number_cardID: 0,
    email: "",
    phone_number: 0,
    province: "",
    canton: "",
    distric: "",
    student_id: 0
  })

  const flag = store.isElectronicInvoiceCreated

  const handleInputChange = (event) => {
    const {name, value} = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }))
  }

  const handleSubmit = (event) => {
    actions.ElectronicInvoice(formData)
    if (flag) {
      return(
        <div class="alert alert-success" role="alert">
            A simple success alert—check it out!
        </div>
      )
    }
    setInterval(navigate("/electronicinvoice"), 2000)
    event.preventDefault();
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
          <h1>¡Bienvenido estudiante!</h1>
          <p>Sé parte de la familia ACUA</p>
        </div>
      </div>
      <form className="mt-4 p-4 rounded shadow mb-4" style={{ backgroundColor: '#e9ecef' }} onSubmit={handleSubmit}>
        <h3 className="mb-3">Crea tu usuario</h3>
        <div className="d-flex mb-3">
          <div className="me-2 flex-fill">
            <label className="form-label">Nombre</label>
            <input className="form-control" placeholder="Nombre" onChange={handleInputChange}/>
          </div>
        </div>
        <div className="d-flex mb-3">
          <div className="me-2 flex-fill">
            <label className="form-label">Tipo de identificación</label>
            <input className="form-control" placeholder="Tipo de identificación" onChange={handleInputChange}/>
          </div>
          <div className="ms-2 flex-fill">
            <label className="form-label">Número de identificación</label>
            <input className="form-control" placeholder="Número de identificación" onChange={handleInputChange}/>
          </div>
        </div>
        <div className="mb-3">
          <label className="form-label">Email</label>
          <input className="form-control" placeholder="Email" onChange={handleInputChange}/>
        </div>
        <div className="mb-3">
          <label className="form-label">Número telefónico</label>
          <input className="form-control" placeholder="Número telefónico" onChange={handleInputChange}/>
        </div>
        <div className="d-flex mb-3">
          <div className="me-2 flex-fill">
            <label className="form-label">Provincia</label>
            <input className="form-control" placeholder="Provincia" onChange={handleInputChange}/>
          </div>
          <div className="me-2 flex-fill">
            <label className="form-label">Cantón</label>
            <input className="form-control" placeholder="Cantón" onChange={handleInputChange}/>
          </div>
          <div className="me-2 flex-fill">
            <label className="form-label">Distrito</label>
            <input className="form-control" placeholder="Distrito" onChange={handleInputChange}/>
          </div>
        </div>
        <div className="mb-3">
          <button type="submit" className="btn btn-warning w-100"
            style={{ borderRadius: '20px', boxShadow: '0px 4px 8px' }}>Guardar</button>
        </div>
      </form>
    </div>
  );
};