import React from "react";
import { Link } from "react-router-dom";
import "../../styles/login.css";
import { MultiButton } from "../component/MultiButton";

const Login = () => {
  return (
    <div className="d-flex flex-column justify-content-between min-vh-100" style={{ backgroundColor: "#f8f9fa", margin: "0" }}>
      <div style={{ position: "relative", width: "100%" }}>
        <img src="https://i.postimg.cc/XJ784zpy/Whats-App-Image-2024-06-17-at-19-29-08.jpg" alt="Jumbotron" className="img-fluid mb-3" style={{ width: "100%", maxHeight: "150px", objectFit: "cover" }} />
        <div style={{ position: "absolute", top: "50%", left: "20%", transform: "translate(-20%, -50%)", color: "black" }}>
          <h1>¡Bienvenido estudiante!</h1>
          <p>Sé parte de la familia ACUA</p>
        </div>
      </div>
      <div className="d-flex flex-column justify-content-center align-items-center" style={{ flexGrow: 1 }}>
        <form className="mt-5 p-4 rounded shadow" style={{ backgroundColor: "#e9ecef", maxWidth: "400px", width: "100%", marginBottom: "5rem" }}>
          <h3 className="mb-3">Inicia sesión</h3>
          <div className="mb-3">
            <label className="form-label">Email</label>
            <input className="form-control" placeholder="Email" />
          </div>
          <div className="mb-3">
            <label className="form-label">Contraseña</label>
            <input type="password" className="form-control" placeholder="Contraseña" />
          </div>
          <div className="mb-3">
            <MultiButton color="purple" text="Inicia sesión →" width="160" link="/HomeStudent" />
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
