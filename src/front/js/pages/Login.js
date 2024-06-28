import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/login.css";
import { NavbarACUA } from '../component/NavbarACUA';

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault():
    setError("");

    const response = await fetch("/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();
    if (response.ok) {
      // Guardar el token y redirigir al estudiante
      localStorage.setItem("access_token", data.access_token);
      navigate("/HomeStudent");
    } else {
      setError(data.msg);
    }
  };

  return (
    <React.Fragment>
      <NavbarACUA />
      <div className="d-flex flex-column justify-content-between min-vh-100" style={{ backgroundColor: "#f8f9fa", margin: "0" }}>
        <div style={{ position: "relative", width: "100%" }}>
          <img src="https://i.postimg.cc/XJ784zpy/Whats-App-Image-2024-06-17-at-19-29-08.jpg" alt="Jumbotron" className="img-fluid mb-3" style={{ width: "100%", maxHeight: "150px", objectFit: "cover" }} />
          <div style={{ position: "absolute", top: "50%", left: "20%", transform: "translate(-20%, -50%)", color: "black" }}>
            <h1>¡Bienvenido estudiante!</h1>
            <p>Sé parte de la familia ACUA</p>
          </div>
        </div>
        <div className="d-flex flex-column justify-content-center align-items-center" style={{ flexGrow: 1 }}>
          <form onSubmit={handleLogin} className="mt-5 p-4 rounded shadow" style={{ backgroundColor: "#e9ecef", maxWidth: "400px", width: "100%", marginBottom: "5rem" }}>
            <h3 className="mb-3">Inicia sesión</h3>
            {error && <div className="alert alert-danger">{error}</div>}
            <div className="mb-3">
              <label className="form-label">Email</label>
              <input 
                className="form-control" 
                placeholder="Email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)} 
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Contraseña</label>
              <input 
                type="password" 
                className="form-control" 
                placeholder="Contraseña" 
                value={password}
                onChange={(e) => setPassword(e.target.value)} 
              />
            </div>
            <div className="mb-3">
              <button type="submit" className="btn btn-primary">Inicia sesión →</button>
            </div>
          </form>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Login;
