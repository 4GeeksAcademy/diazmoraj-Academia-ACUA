const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			administrators: [],

			professors: [],

			students: [],

			courses: [],

			modalities: [],

			professorspayment: [],

			studentspayment: [],

			electronicinvoices: [],

			newcourses: [],

			isAdministratorCreated: false,
			isProfessorCreated: false,
			isStudentCreated: false,
			isCourseCreated: false,
			isModalityCreated: false,
			isProfessorPaymentCreated: false,
			isStudentPaymentCreated: false,
			isElectronicInvoiceCreated: false,
			isNewCourseCreated: false,

		},
		actions: {
			// Use getActions to call a function within a fuction
			exampleFunction: () => {
				getActions().changeColor(0, "green");
			},

			getMessage: async () => {
				try {
					// fetching data from the backend
					const resp = await fetch(process.env.BACKEND_URL + "/api/hello")
					const data = await resp.json()
					setStore({ message: data.message })
					// don't forget to return something, that is how the async resolves
					return data;
				} catch (error) {
					console.log("Error loading message from backend", error)
				}
			},
			changeColor: (index, color) => {
				//get the store
				const store = getStore();

				//we have to loop the entire demo array to look for the respective index
				//and change its color
				const demo = store.demo.map((elm, i) => {
					if (i === index) elm.background = color;
					return elm;
				});

				//reset the global store
				setStore({ demo: demo });
			},

			// Todos los administradores
			getAdmins: () => {
				fetch(process.env.BACKEND_URL + "/api/administrators")
					.then(response => {
						console.log(response);
						return response.json();
					})
					.then((data) => {
						console.log("Data:", data)
						console.log(data.administrators)
						setStore({ administrators: data.administrators })
					})
					.catch((error) => {
						console.log(error)
					})
			},

			// Todos los profesores
			getProfessors: () => {
				fetch(process.env.BACKEND_URL + "/api/professors")
					.then(response => {
						console.log(response);
						return response.json();
					})
					.then((data) => {
						console.log("Data:", data)
						console.log(data.professors)
						setStore({ professors: data.professors })
					})
					.catch((error) => {
						console.log(error)
					})
			},

			// Todos los estudiantes
			getStudents: () => {
				fetch(process.env.BACKEND_URL + "/api/students")
					.then(response => {
						console.log(response);
						return response.json();
					})
					.then((data) => {
						console.log("Data:", data)
						console.log(data.students)
						setStore({ students: data.students })
					})
					.catch((error) => {
						console.log(error)
					})
			},

			// Todos los cursos
			getCourses: () => {
				fetch(process.env.BACKEND_URL + "/api/courses")
					.then(response => {
						console.log(response);
						return response.json();
					})
					.then((data) => {
						console.log("Data:", data)
						console.log(data.courses)
						setStore({ courses: data.courses })
					})
					.catch((error) => {
						console.log(error)
					})
			},

			// Todas las modalidades
			getModalities: () => {
				fetch(process.env.BACKEND_URL + "/api/modalities")
					.then(response => {
						console.log(response);
						return response.json();
					})
					.then((data) => {
						console.log("Data:", data)
						console.log(data.modalities)
						setStore({ modalities: data.modalities })
					})
					.catch((error) => {
						console.log(error)
					})
			},

			// Todos los pagos de profesores
			getProfessorPayment: () => {
				fetch(process.env.BACKEND_URL + "/api/professorspayment")
					.then(response => {
						console.log(response);
						return response.json();
					})
					.then((data) => {
						console.log("Data:", data)
						console.log(data.profpays)
						setStore({ professorspayment: data.profpays })
					})
					.catch((error) => {
						console.log(error)
					})
			},

			// Todos los pagos de estudiantes
			getStudentPayment: () => {
				fetch(process.env.BACKEND_URL + "/api/studentspayment")
					.then(response => {
						console.log(response);
						return response.json();
					})
					.then((data) => {
						console.log("Data:", data)
						console.log(data.studpays)
						setStore({ studentspayment: data.studpays })
					})
					.catch((error) => {
						console.log(error)
					})
			},

			// Todas facturas electronicas
			getElectronicInvoice: () => {
				fetch(process.env.BACKEND_URL + "/api/electronicinvoice")
					.then(response => {
						console.log(response);
						return response.json();
					})
					.then((data) => {
						console.log("Data:", data)
						console.log(data.electinvs)
						setStore({ electronicinvoices: data.electinvs })
					})
					.catch((error) => {
						console.log(error)
					})
			},

			// Todos los nuevos cursos
			getnewCourses: () => {
				fetch(process.env.BACKEND_URL + "/api/newcourses")
					.then(response => {
						console.log(response);
						return response.json();
					})
					.then((data) => {
						console.log("Data:", data)
						console.log(data.newcourses)
						setStore({ newcourses: data.newcourses })
					})
					.catch((error) => {
						console.log(error)
					})
			},

			// Agregar administrador
			newAdministrator: (object) => {
				fetch(process.env.BACKEND_URL + "/api/administrator", {
					method: "POST",
					body: JSON.stringify(object),
					headers: { "Content-Type": "application/json" }
				})
					.then(response => {
						console.log(response)
						if (response.ok) {
							setStore({ isAdministratorCreated: true })
						}
						return response.json()
					})
					.then(data => data)
					.catch(error => error)
			},

			// Agregar profesor
			newProfessor: (data) => {
				const actions = getActions()
				return fetch(process.env.BACKEND_URL + "/api/professor", {
					method: "POST",
					body: JSON.stringify(data),
					headers: { "Content-Type": "application/json" }
				})
					.then(response => {
						console.log(response)
						if (response.ok) {
							return response.json()
						}
						throw new Error("Ocurrió un error creando un nuevo profesor")
					})
					.then(data => {
						console.log(data)
						// setStore({ isProfessorCreated: true })
						actions.getProfessors()
						return true
					})
					.catch(error => {
						console.log(error)
						return false
					})
			},

			// Agregar estudiante
			newStudent: () => {
				fetch(process.env.BACKEND_URL + "/api/student", {
					method: "POST",
					body: JSON.stringify(),
					headers: { "Content-Type": "application/json" }
				})
					.then(response => response.json())
					.then(data => {
						console.log(data);
						setStore(data.students);
					})
					.catch(error => console.error("Error:", error));
			},


			// Agregar curso
			newCourse: (object) => {
				fetch(process.env.BACKEND_URL + "/api/course", {
					method: "POST",
					body: JSON.stringify(object),
					headers: { "Content-Type": "application/json" }
				})
					.then(response => {
						console.log(response)
						if (response.ok) {
							setStore({ isCourseCreated: true })
						}
						return response.json()
					})
					.then(data => data)
					.catch(error => error)
			},

			// Agregar modalidad
			newModality: (objet) => {
				fetch(process.env.BACKEND_URL + "/api/modality", {
					method: "POST",
					body: JSON.stringify(objet),
					headers: { "Content-Type": "application/json" }
				})
					.then(response => {
						console.log(response)
						if (response.ok) {
							setStore({ isModalityCreated: true })
						}
						return response.json()
					})
					.then(data => data)
					.catch(error => error)
			},

			// Agregar pago profesor
			newProfessorPayment: (objet) => {
				fetch(process.env.BACKEND_URL + "/api/professorpayment", {
					method: "POST",
					body: JSON.stringify(objet),
					headers: { "Content-Type": "application/json" }
				})
					.then(response => {
						console.log(response)
						if (response.ok) {
							setStore({ isProfessorPaymentCreated: true })
						}
						return response.json()
					})
					.then(data => data)
					.catch(error => error)
			},

			// Agregar pago estudiante
			newStudentPayment: (objet) => {
				fetch(process.env.BACKEND_URL + "/api/studentpayment", {
					method: "POST",
					body: JSON.stringify(objet),
					headers: { "Content-Type": "application/json" }
				})
					.then(response => {
						console.log(response)
						if (response.ok) {
							setStore({ isStudentPaymentCreated: true })
						}
						return response.json()
					})
					.then(data => data)
					.catch(error => error)
			},

			// Agregar factura electronica
			newElectronicInvoice: (object) => {
				fetch(process.env.BACKEND_URL + "/api/electronicinvoice", {
					method: "POST",
					body: JSON.stringify(object),
					headers: { "Content-Type": "application/json" }
				})
					.then(response => {
						console.log(response)
						if (response.ok) {
							setStore({ isElectronicInvoiceCreated })
						}
						return response.json()
					})
					.then(data => data)
					.catch(error => error)
			},

			// Agregar nuevo curso
			newnewCourse: (object) => {
				fetch(process.env.BACKEND_URL + "/api/newcourse", {
					method: "POST",
					body: JSON.stringify(object),
					headers: { "Content-Type": "application/json" }
				})
					.then(response => {
						console.log(response)
						if (response.ok) {
							setStore({ isNewCourseCreated })
						}
						return response.json()
					})
					.then(data => data)
					.catch(error => error)

			},

		}
	}
};

export default getState;