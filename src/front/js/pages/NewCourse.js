import React from "react";
import LogButton from "../component/LogButton";
import { MultiButton } from "../component/MultiButton";
import { Link } from "react-router-dom";
import { showNotification } from "../utils/ShowNotification";

export const NewCourse = () => {

    const navigate = useNavigate()
    const { store, actions } = useContext(Context)
    const [formData, setFormData] = useState({
        professor_id: 0,
        student_id: 0,
        course_id: 0,
        modality_id: 0,
    })

    // const flag = store.isProfessorCreated

    const handleInputChange = (event) => {
        const { professor_id, value } = event.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [professor_id]: value,
        }))
    }

    const handleSubmit = async () => {
        // event.preventDefault();
        const isCreated = await actions.newnewCourse(formData)
        console.log(isCreated)
        if (isCreated) {
            showNotification("Nuevo curso creado con éxito")
            navigate("/homeadmin")
        } else {
            showNotification("Ocurrió un error al tratar de agregar un nuevo curso", "error")
        }

    }

    return (
        <React.Fragment>
            <div className="d-flex flex-column justify-content-start align-items-center min-vh-100"
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
                        <h1>Registrar nuevo curso</h1>
                    </div>
                </div>
                <form className="mt-5 p-5 rounded shadow mb-5" style={{ backgroundColor: '#e9ecef' }}>
                    <div className="d-flex mb-3">
                        <div className="me-2 flex-fill">
                            <label className="form-label fs-4 mb-3" style={{ color: '#5751e1' }}>Introduzca nombre del nuevo curso</label>
                            <input className="form-control mb-3" placeholder="Nombre nuevo curso" />
                        </div>
                    </div>
                    <div className="d-flex justify-content-between">
                        <Link to="/homeadmin" className="text-decoration-none">
                            <MultiButton color='purple' text='Volver' width='100' onClick={handleSubmit}/>
                        </Link>
                        <Link to="/homeadmin" className="text-decoration-none">
                            <MultiButton color='purple' text='Guardar' width='100' onClick={handleSubmit}/>
                        </Link>
                    </div>
                </form>
            </div>
        </React.Fragment>
    );
};
