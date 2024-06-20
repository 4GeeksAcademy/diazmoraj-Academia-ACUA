import React from "react";

import "../../styles/login.css"

const Login = () => {
    return (

        <div className="contenedor">
            <div>
                <div>
                    <div>
                        <h1>Ingresar</h1>
                    </div>
                    <div>
                        <label>Usuario</label>
                        <input></input>
                        <label>Contraseña</label>
                        <input></input>
                    </div>
                    <div>
                        <button className="btn btn-success">Ingresar</button>
                    </div>
                    <div>
                        <h6><a href="https://www.freecodecamp.org/">Olvidar Contraseña</a></h6>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login