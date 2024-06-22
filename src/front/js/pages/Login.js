import React from "react";

import "../../styles/login.css"

const Login = () => {
    return (

        <div className="contenedor">
            <div className="central">
                <div className="login">
                    <div className="titulo">
                        <h3>Ingresar</h3>
                    </div>
                    <div>
                        <label>Usuario</label><br></br>
                        <input></input>
                        <label>Contraseña</label>
                        <input></input>
                    </div>
                    <div className="boton">
                        <button className="btn btn-warning">Ingresar</button>
                    </div>
                    <div className="link">
                        <h6><a href="https://www.google.com/">¿Olvidaste la Contraseña?</a></h6>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login