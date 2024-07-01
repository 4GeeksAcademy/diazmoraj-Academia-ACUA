import React from "react";
import { Link } from "react-router-dom";
import { MultiButton } from "../component/MultiButton";
import { showNotification } from "../utils/ShowNotification";

const FormStudent = () => {

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
        const isCreated = await actions.newStudent(formData)
        console.log(isCreated)
        if (isCreated) {
            showNotification("Estudiante creado con éxito")
            navigate("/login")
        } else {
            showNotification("Ocurrió un error al tratar de agregar un estudiante", "error")
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
                    <h1>Registro de nuevo estudiante</h1>
                </div>
            </div>
            <form className="mt-4 p-4 rounded shadow mb-4" style={{ backgroundColor: '#e9ecef' }}>
                <h3 className="mb-3">Ingrese los datos</h3>
                <div className="d-flex mb-3">
                    <div className="me-2 flex-fill">
                        <label className="form-label">Nombre</label>
                        <input className="form-control" placeholder="Nombre" onClick={handleInputChange}/>
                    </div>
                    <div className="ms-2 flex-fill">
                        <label className="form-label">Apellido</label>
                        <input className="form-control" placeholder="Apellido" onClick={handleInputChange}/>
                    </div>
                </div>
                <div className="mb-3">
                    <label className="form-label">Fecha de nacimiento</label>
                    <div className="d-flex">
                        <input className="form-control me-2" placeholder="Día" style={{ maxWidth: '80px' }} onClick={handleInputChange}/>
                        <input className="form-control me-2" placeholder="Mes" style={{ maxWidth: '100px' }} onClick={handleInputChange}/>
                        <input className="form-control" placeholder="Año" style={{ maxWidth: '100px' }} onClick={handleInputChange}/>
                    </div>
                </div>
                <div className="mb-3">
                    <label className="form-label">Email</label>
                    <input className="form-control" placeholder="Email" onClick={handleInputChange}/>
                </div>
                <div className="mb-3">
                    <label className="form-label">Número telefónico</label>
                    <input className="form-control" placeholder="Número telefónico" onClick={handleInputChange}/>
                </div>
                <div className="d-flex mb-3">
                    <div className="me-2 flex-fill">
                        <label className="form-label">Tipo de identificación</label><br></br>
                        <select name="select">
                            <option value="value1" selected>-----------</option>
                            <option value="value2">Cedula Nacional</option>
                            <option value="value3">DIMEX</option>
                            <option value="value3">Pasaporte</option>
                        </select>
                        {/* <input className="form-control" placeholder="Tipo de identificación" onClick={handleInputChange}/> */}
                    </div>
                    <div className="ms-2 flex-fill">
                        <label className="form-label">Número de identificación</label>
                        <input className="form-control" placeholder="Número de identificación" onClick={handleInputChange}/>
                    </div>
                </div>
                <div className="d-flex mb-3">
                    <div className="me-2 flex-fill">
                        <label className="form-label">Provincia</label>
                        <input className="form-control" placeholder="Provincia" onClick={handleInputChange}/>
                    </div>
                    <div className="me-2 flex-fill">
                        <label className="form-label">Cantón</label>
                        <input className="form-control" placeholder="Cantón" onClick={handleInputChange}/>
                    </div>
                    <div className="me-2 flex-fill">
                        <label className="form-label">Distrito</label>
                        <input className="form-control" placeholder="Distrito" onClick={handleInputChange}/>
                    </div>
                </div>
                <div className="mb-3">
                    <label className="form-label">Contraseña</label>
                    <input type="password" className="form-control" placeholder="Contraseña" onClick={handleInputChange}/>
                </div>
                <div className="mb-4">
                    <label className="form-label">Confirmar contraseña</label>
                    <input type="password" className="form-control" placeholder="Confirmar contraseña" onClick={handleInputChange}/>
                </div>
                <div className="mb-4">
                    <MultiButton color="purple" text="Inicia sesión →" width="700" link="/HomeStudent" onClick={handleSubmit}/>
                </div>
                <Link to={`/Login`} className="mt-3">
                    ¿Ya tienes un usuario? Inicia sesión aquí</Link>
            </form>
        </div>
    );
};

export default FormStudent;
