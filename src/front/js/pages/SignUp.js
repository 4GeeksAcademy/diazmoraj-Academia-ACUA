import React, { useState } from "react";
import { Link } from "react-router-dom";
import { NavbarACUA } from '../component/NavbarACUA';

export const SignUp = () => {
  const [formData, setFormData] = useState({
    name: "",
    last_name: "",
    email: "",
    province: "",
    canton: "",
    distric: "",
    password: "",
    cardID_type: "",
    number_cardID: "",
    birthday: "",
    phone_number: ""
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch(process.env.BACKEND_URL + "/api/student", {
        method: "POST",
        body: JSON.stringify(formData),
        headers: { "Content-Type": "application/json" },
      });
      const data = await response.json();
      console.log(data); 
    } catch (error) {
      console.error("Error:", error);

    }
  };

  return (
    <React.Fragment>
      <NavbarACUA />
      <div className="d-flex flex-column justify-content-center align-items-center" style={{ backgroundColor: '#f8f9fa' }}>
        <div style={{ position: 'relative', width: '100%' }}>
          <img src="https://i.postimg.cc/XJ784zpy/Whats-App-Image-2024-06-17-at-19-29-08.jpg"
            alt="Jumbotron" className="img-fluid mb-3" style={{ width: '100%', maxHeight: '150px', objectFit: 'cover' }} />
          <div style={{ position: 'absolute', top: '50%', left: '35%', transform: 'translate(-45%, -50%)', color: 'black' }}>
            <h1>¡Bienvenido estudiante!</h1>
            <p>Sé parte de la familia ACUA</p>
          </div>
        </div>
        <form onSubmit={handleSubmit} className="mt-4 p-4 rounded shadow mb-4" style={{ backgroundColor: '#e9ecef', maxWidth: '600px', width: '100%' }}>
          <h3 className="mb-3">Crea tu usuario</h3>
          <div className="d-flex mb-3">
            <div className="me-2 flex-fill">
              <label className="form-label">Nombre</label>
              <input
                className="form-control"
                placeholder="Nombre"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="ms-2 flex-fill">
              <label className="form-label">Apellido</label>
              <input
                className="form-control"
                placeholder="Apellido"
                name="last_name"
                value={formData.last_name}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>
          <div className="mb-3">
            <label className="form-label">Fecha de Nacimiento</label>
            <input
              type="date"
              className="form-control"
              name="birthday"
              value={formData.birthday}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Email</label>
            <input
              className="form-control"
              placeholder="Email"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Teléfono</label>
            <input
              className="form-control"
              placeholder="Teléfono"
              name="phone_number"
              value={formData.phone_number}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="d-flex mb-3">
            <div className="me-2 flex-fill">
              <label className="form-label">Tipo de Identificación</label>
              <input
                className="form-control"
                placeholder="Tipo de Identificación"
                name="cardID_type"
                value={formData.cardID_type}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="ms-2 flex-fill">
              <label className="form-label">Número de Identificación</label>
              <input
                className="form-control"
                placeholder="Número de Identificación"
                name="number_cardID"
                value={formData.number_cardID}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>
          <div className="mb-3">
            <label className="form-label">Contraseña</label>
            <input
              type="password"
              className="form-control"
              placeholder="Contraseña"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="mb-4">
            <label className="form-label">Confirmar Contraseña</label>
            <input
              type="password"
              className="form-control"
              placeholder="Confirmar Contraseña"
              required
            />
          </div>
          <div className="mb-4">
            <button type="submit" className="btn btn-primary" Link to="/HomeStudent">Registrarse →</button>
          </div>
          <Link to={`/Login`} className="mt-3">
            ¿Ya tienes un usuario? Inicia sesión aquí
          </Link>
        </form>
      </div>
    </React.Fragment>
  );
};
