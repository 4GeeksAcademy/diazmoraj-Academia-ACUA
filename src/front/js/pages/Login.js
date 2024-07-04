import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";
import "../../styles/login.css";
import { NavbarACUA } from '../component/NavbarACUA';
import { showNotification } from "../utils/ShowNotification";
import useAuth from "../component/frontAuth/useAuth";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { actions } = useContext(Context);
    const navigate = useNavigate();
    const { login, isLoggedIn, role } = useAuth();

    const handleLogin = async (e) => {
        e.preventDefault();
        const result = await login(email, password);
        if (result.success) {
            console.log(role)
            showNotification("Inicio de sesión exitoso");
            const role = localStorage.getItem('user_type')
            // if (isLoggedIn) {
            if (role === 'student') {
                navigate('/homestudent')
            }
            else if (role === 'admin') {
                navigate('/homeadmin')
            }
            else if (role === 'professor') {
                navigate('/homeprofessor')
            }
            else {
                console.error('No se pudo determinar el rol del usuario')
            }
            // }
        } else {
            showNotification("Correo o contraseña inválido", "error");
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
