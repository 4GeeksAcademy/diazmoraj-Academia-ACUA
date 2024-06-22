import React from "react";
import LogButton from "../component/LogButton";

export const NewModality = () => {
    return (
        <React.Fragment>
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
                        <h1>Registrar nueva modalidad de curso</h1>
                    </div>
                </div>
                <form className="mt-5 p-5 rounded shadow mb-5" style={{ backgroundColor: '#e9ecef' }}>
                    <div className="d-flex mb-3">
                        <div className="me-2 flex-fill">
                            <label className="form-label fs-3 mb-3" style={{ color: '#5751e1' }}>Introduzca nueva modalidad de curso</label>
                            <input className="form-control mb-3" placeholder="Nueva modalidad" />
                        </div>
                    </div>
                    <div className="d-flex justify-content-between">
                        <LogButton text="Volver" />
                        <LogButton text="Registrar" />
                    </div>
                </form>
            </div>
        </React.Fragment>
    );
};
