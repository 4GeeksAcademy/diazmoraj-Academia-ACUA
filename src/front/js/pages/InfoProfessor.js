import React from "react";
import { Link } from "react-router-dom";

const InfoProfessor = () => {
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
                    <h1>Información personal</h1>
                </div>
            </div>
            <form className="mt-4 p-4 rounded shadow mb-4" style={{ backgroundColor: '#e9ecef', maxWidth: '800px', width: '100%' }}>
                <h3 className="mb-3">Edita tu información</h3>
                <div className="d-flex mb-2 align-items-center">
                    <div className="flex-fill me-3">
                        <div className="mb-2">
                            <label className="form-label">Nombre</label>
                            <input className="form-control" placeholder="Nombre" />
                        </div>
                        <div className="mb-2">
                            <label className="form-label">Apellido</label>
                            <input className="form-control" placeholder="Apellido" />
                        </div>
                    </div>
                    <div className="d-flex flex-column align-items-center position-relative">
                        <label htmlFor="profilePicture" className="form-label">Selecciona una foto de perfil</label>
                        <img src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
                            alt="Foto de perfil" className="mb-1" style={{ width: '150px', height: '150px' }} />
                        <input type="file" className="form-control-file" id="profilePicture" style={{ display: 'none' }} />
                        <button type="button" className="btn btn-light" style={{ marginTop: '10px', borderRadius: '50%' }}
                            onClick={() => document.getElementById('profilePicture').click()}>
                            <i className="fas fa-pencil-alt"></i>
                        </button>
                    </div>
                </div>
                <div className="mb-2">
                    <label className="form-label">Fecha de nacimiento</label>
                    <div className="d-flex">
                        <input className="form-control me-2" placeholder="Día" style={{ maxWidth: '80px' }} />
                        <input className="form-control me-2" placeholder="Mes" style={{ maxWidth: '100px' }} />
                        <input className="form-control" placeholder="Año" style={{ maxWidth: '100px' }} />
                    </div>
                </div>
                <div className="mb-3">
                    <label className="form-label">Email</label>
                    <input className="form-control" placeholder="Email" />
                </div>
                <div className="mb-3">
                    <label className="form-label">Número telefónico</label>
                    <input className="form-control" placeholder="Número telefónico" />
                </div>
                <div className="d-flex mb-3">
                    <div className="me-2 flex-fill">
                        <label className="form-label">Tipo de identificación</label>
                        <input className="form-control" placeholder="Tipo de identificación" />
                    </div>
                    <div className="ms-2 flex-fill">
                        <label className="form-label">Número de identificación</label>
                        <input className="form-control" placeholder="Número de identificación" />
                    </div>
                </div>
                <div className="d-flex mb-3">
                    <div className="me-2 flex-fill">
                        <label className="form-label">Provincia</label>
                        <input className="form-control" placeholder="Provincia" />
                    </div>
                    <div className="me-2 flex-fill">
                        <label className="form-label">Cantón</label>
                        <input className="form-control" placeholder="Cantón" />
                    </div>
                    <div className="me-2 flex-fill">
                        <label className="form-label">Distrito</label>
                        <input className="form-control" placeholder="Distrito" />
                    </div>
                </div>
                <div className="mb-3">
                    <label className="form-label">Contraseña actual</label>
                    <input type="password" className="form-control" placeholder="Contraseña actual" />
                </div>
                <div className="d-flex mb-4">
                    <div className="me-2 flex-fill">
                        <label className="form-label">Nueva contraseña</label>
                        <input type="password" className="form-control" placeholder="Nueva contraseña" />
                    </div>
                    <div className="ms-2 flex-fill">
                        <label className="form-label">Confirmar contraseña</label>
                        <input type="password" className="form-control" placeholder="Confirmar contraseña" />
                    </div>
                </div>
                <div className="mb-3">
                    <Link to={`/HomeProfessor`}>
                        <button type="submit" className="btn btn-warning w-100"
                            style={{ borderRadius: '20px', boxShadow: '0px 4px 8px' }}>Guardar información →
                        </button>
                    </Link>
                </div>
            </form>
        </div>
    );
};

export default InfoProfessor;