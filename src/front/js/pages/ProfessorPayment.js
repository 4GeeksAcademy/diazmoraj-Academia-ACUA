import React, { useState, useEffect } from "react";
import { useContext } from "react";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { MultiButton } from "../component/MultiButton";
import { showNotification } from "../utils/ShowNotification";

export const ProfessorPayment = () => {

    const navigate = useNavigate()
    const { store, actions } = useContext(Context)
    const [formData, setFormData] = useState({
        payment_method: "",
        phone_number: 0,
        iban_account: "",
        professor_id: 0,
    })

    const [searchTerm, setSearchTerm] = useState("")
    const [options, setOptions] = useState([])
    const [selectedOption, setSelectedOption] = useState(null)

    // const flag = store.isProfessorCreated

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value,
        }))
    }

    const handleSubmit = async () => {
        // event.preventDefault();
        const isCreated = await actions.newProfessorPayment(formData)
        console.log(isCreated)
        if (isCreated) {
            showNotification("Nuevo pago creado con éxito")
            navigate("/professorspaymentregister")
        } else {
            showNotification("Ocurrió un error al tratar de agregar un nuevo pago", "error")
        }

    }

    const handleSelectChange = (e) => {
        const selectedId = e.target.value
        const selectedObj = options.find(option => option.id === parseInt(selectedId))
        console.log(selectedObj)
        setSelectedOption(selectedObj)
        setFormData({
            ...formData,
            professor_id: selectedObj?.id
        })
    }

    useEffect(() => {
        if (searchTerm.length > 0) {
            const searchProfessor = async () => {
                try {
                    const response = await fetch(`${process.env.BACKEND_URL}/api/search/professors`, {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ 'term': searchTerm })
                    });
                    if (response.ok) {
                        const data = await response.json()
                        setOptions(data.result)
                    } else {
                        console.log("Error obteniendo data")
                    }
                } catch (error) {
                    console.log("Error obteniendo data", error)
                }
            };
            searchProfessor()
        } else {
            setOptions([])
        }
    }, [searchTerm])



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
                        <h1>Información pago profesor</h1>
                    </div>
                </div>
                <form className="mt-5 p-5 rounded shadow mb-5" style={{ backgroundColor: '#e9ecef' }}>
                    <div className="d-flex mb-3 row">
                        <div className="me-2 flex-fill">
                            <label className="form-label fs-4 mb-3" style={{ color: '#5751e1' }}>Método de pago</label>
                            <input className="form-control mb-3" placeholder="Método de pago" name="payment_method" value={formData.payment_method} onChange={handleInputChange} />
                        </div>
                        <div className="me-2 flex-fill">
                            <label className="form-label fs-4 mb-3" style={{ color: '#5751e1' }}>Número de teléfono</label>
                            <input className="form-control mb-3" placeholder="Número de teléfono" name="phone_number" value={formData.phone_number} onChange={handleInputChange} />
                        </div>
                        <div className="me-2 flex-fill">
                            <label className="form-label fs-4 mb-3" style={{ color: '#5751e1' }}>N° cuenta IBAN</label>
                            <input className="form-control mb-3" placeholder="N° cuenta IBAN" name="iban_account" value={formData.iban_account} onChange={handleInputChange} />
                        </div>
                        <div className="me-2 flex-fill">
                            <>
                                <label htmlFor="searcInput" className="form-label fs-4 mb-3" style={{ color: '#5751e1' }}>
                                    Seleccione profesor
                                </label>
                                <input
                                    className="form-control mb-3"
                                    type="text"
                                    id="searchInput"
                                    placeholder="Buscar profesor"
                                    value={searchTerm}
                                    onChange={(e) => { setSearchTerm(e.target.value) }}
                                />
                                <select id="selectInput" className="form-control" value={selectedOption ? selectedOption.id : ""} onChange={handleSelectChange}>
                                    <option value="">Seleccionar profesor</option>
                                    {options.map((option) => {
                                        return <option key={option.id} value={option.id}>{option.name} {option.last_name}</option>
                                    })}
                                </select>
                            </>
                            {/* <label className="form-label fs-4 mb-3" style={{ color: '#5751e1' }}>ID professor</label>
                            <input className="form-control mb-3" placeholder="ID professor" name="professor_id" value={formData.professor_id} onChange={handleInputChange} /> */}
                        </div>
                    </div>
                    <div className="d-flex justify-content-between">
                        <button type="button" className="btn btn-primary" onClick={handleSubmit}>Guardar</button>
                        {/* <Link to="/homeadmin" className="text-decoration-none">
                            <MultiButton color='purple' text='Volver' width='100' onClick={handleSubmit} />
                        </Link> */}
                        {/* <MultiButton color='purple' text='Guardar' width='100' onClick={handleSubmit} /> */}
                        <Link to="/professorspaymentregister" className="text-decoration-none">
                            <button type="button" className="btn btn-warning">Cancelar</button>
                        </Link>
                    </div>
                </form>
            </div>
        </React.Fragment>
    );
};
