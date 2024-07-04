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

			singleAdministrator: {},

			singleStudent: {},

			singleProfessor: {},

			professorCourses: {}

			// isAdministratorCreated: false,
			// isProfessorCreated: false,
			// isStudentCreated: false,
			// isCourseCreated: false,
			// isModalityCreated: false,
			// isProfessorPaymentCreated: false,
			// isStudentPaymentCreated: false,
			// isElectronicInvoiceCreated: false,
			// isNewCourseCreated: false,

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

			getSingleAdmin: () => {
				const token = localStorage.getItem('access_token')
				fetch(process.env.BACKEND_URL + "/api/administrator/personalinfo", {
					method: "GET",
					headers: {
						"Content-Type": "application/json",
						'Authorization': 'Bearer ' + token
					}
				})
					.then((response) => {
						return response.json()
					})
					.then((data) => {
						console.log(data)
						setStore({ singleAdministrator: data })
						return data
					})
					.catch((error) => {
						console.log(error)
					})
			},

			getSingleStudent: () => {
				const token = localStorage.getItem('access_token')
				fetch(process.env.BACKEND_URL + "/api/student/personalinfo", {
					method: "GET",
					headers: {
						"Content-Type": "application/json",
						'Authorization': 'Bearer ' + token
					}
				})
					.then((response) => {
						return response.json()
					})
					.then((data) => {
						console.log(data)
						setStore({ singleStudent: data })
						return data
					})
					.catch((error) => {
						console.log(error)
					})
			},

			// updateStudent: (formData) => {
			// 	const token = localStorage.getItem('access_token')
			// 	fetch(process.env.BACKEND_URL + "/api/personalinfo/editstudentinfo/", {
			// 		method: "PUT",
			// 		body: JSON.stringify(formData),
			// 		headers: {
			// 			"Content-Type": "application/json",
			// 			'Authorization': 'Bearer ' + token
			// 		}
			// 	})
			// 		.then((response) => {
			// 			return response.json()
			// 		})
			// 		.then((data) => {
			// 			console.log(data)
			// 			setStore({ student: data.student })
			// 			return data
			// 		})
			// 		.catch((error) => {
			// 			console.log(error)
			// 		})
			// },

			// updateStudent: async (formData) => {
			// 	const token = localStorage.getItem('access_token')
			// 	const actions = getActions()
			// 	try {
			// 		const response = await fetch(process.env.BACKEND_URL + "/api/personalinfo/editstudentinfo/", {
			// 			method: "PUT",
			// 			body: JSON.stringify(formData),
			// 			headers: {
			// 				"Content-Type": "application/json",
			// 				'Authorization': 'Bearer ' + token
			// 			}
			// 		});
			// 		const data = await response.json();

			// 		if (response.ok) {
			// 			setStore({ student: data.student });
			// 			return true;
			// 		} else {
			// 			console.error("Error:", data.msg);
			// 			return false;
			// 		}
			// 	} catch (error) {
			// 		console.error("Error:", error);
			// 		return false;
			// 	}
			// },

			getSingleProfessor: () => {
				const token = localStorage.getItem('access_token')
				fetch(process.env.BACKEND_URL + "/api/professor/personalinfo", {
					method: "GET",
					headers: {
						"Content-Type": "application/json",
						'Authorization': 'Bearer ' + token
					}
				})
					.then((response) => {
						return response.json()
					})
					.then((data) => {
						console.log(data)
						setStore({ singleProfessor: data })
						return data
					})
					.catch((error) => {
						console.log(error)
					})
			},

			getProfessorCourses: () => {
				const token = localStorage.getItem('access_token')
				fetch(process.env.BACKEND_URL + "/api/professor/registeredcourses", {
					method: "GET",
					headers: {
						"Content-Type": "application/json",
						'Authorization': 'Bearer ' + token
					}
				})
					.then((response) => {
						return response.json()
					})
					.then((data) => {
						console.log(data)
						setStore({ professorCourses: data })
						return data
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
			getProfessorsPayment: () => {
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
			getStudentsPayment: () => {
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
			getElectronicInvoices: () => {
				fetch(process.env.BACKEND_URL + "/api/electronicinvoices")
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

			// Todos los cursos registrados
			getRegisteredCourses: () => {
				fetch(process.env.BACKEND_URL + "/api/registeredcourses")
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
			newAdministrator: (data) => {
				const actions = getActions()
				return fetch(process.env.BACKEND_URL + "/api/createadministrator", {
					method: "POST",
					body: JSON.stringify(data),
					headers: { "Content-Type": "application/json" }
				})
					.then(response => {
						console.log(response)
						if (response.ok) {
							return response.json()
							// setStore({ isAdministratorCreated: true })
						}
						throw new Error("Ocurrió un error creando un nuevo administrador")
					})
					.then(data => {
						console.log(data)
						actions.getAdmins()
						return true
					})
					.catch(error => {
						console.log(error)
						return false
					})
			},

			// Agregar profesor
			newProfessor: (data) => {
				const actions = getActions()
				return fetch(process.env.BACKEND_URL + "/api/createprofessor", {
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
						localStorage.setItem("userType", "profesor"); // Guardar el tipo de usuario en localStorage
						console.log("Tipo de usuario guardado en localStorage");
						return true
					})
					.catch(error => {
						console.log(error)
						return false
					})
			},

			// Agregar estudiante
			// actions.js
			newStudent: async (formData) => {
				const actions = getActions()
				try {
					const response = await fetch(process.env.BACKEND_URL + "/api/createstudent", {
						method: "POST",
						body: JSON.stringify(formData),
						headers: { "Content-Type": "application/json" }
					});
					const data = await response.json();

					if (response.ok) {
						setStore({ student: data.student });
						actions.getStudents();
						localStorage.setItem("userType", "estudiante"); // Guarda el tipo de usuario en localStorage
						console.log("Tipo de usuario guardado en localStorage");
						return true;
					} else {
						console.error("Error:", data.msg);
						return false;
					}
				} catch (error) {
					console.error("Error:", error);
					return false;
				}
			},



			login: async (email, password) => {
				try {
					const response = await fetch(process.env.BACKEND_URL + "/api/login", {
						method: "POST",
						headers: { "Content-Type": "application/json" },
						body: JSON.stringify({ email, password })
					});

					if (!response.ok) {
						const errorData = await response.json();
						throw new Error(errorData.msg);
					}

					const data = await response.json();
					localStorage.setItem("access_token", data.access_token);
					localStorage.setItem("user_type", data.user_type);  // Guarda el tipo de usuario en el localStorage
					localStorage.setItem("id", `${data.id}`)
					localStorage.setItem("email", data.email)
					return { success: true };
				} catch (error) {
					console.error("Error:", error);
					return { success: false, message: error.message };
				}
			},


			// Agregar curso
			newCourse: (data) => {
				const actions = getActions()
				return fetch(process.env.BACKEND_URL + "/api/addcourse", {
					method: "POST",
					body: JSON.stringify(data),
					headers: { "Content-Type": "application/json" }
				})
					.then(response => {
						console.log(response)
						if (response.ok) {
							return response.json()
						}
						throw new Error("Ocurrió un error creando un nuevo curso")
					})
					.then(data => {
						console.log(data)
						// setStore({ isProfessorCreated: true })
						actions.getCourses()
						return true
					})
					.catch(error => {
						console.log(error)
						return false
					})
			},

			// Agregar modalidad
			newModality: (data) => {
				const actions = getActions()
				return fetch(process.env.BACKEND_URL + "/api/addmodality", {
					method: "POST",
					body: JSON.stringify(data),
					headers: { "Content-Type": "application/json" }
				})
					.then(response => {
						console.log(response)
						if (response.ok) {
							return response.json()
						}
						throw new Error("Ocurrió un error creando una nueva modalidad")
					})
					.then(data => {
						console.log(data)
						// setStore({ isProfessorCreated: true })
						actions.getModalities()
						return true
					})
					.catch(error => {
						console.log(error)
						return false
					})
			},

			// Agregar pago profesor
			newProfessorPayment: (data) => {
				const actions = getActions()
				return fetch(process.env.BACKEND_URL + "/api/addprofessorpayment", {
					method: "POST",
					body: JSON.stringify(data),
					headers: { "Content-Type": "application/json" }
				})
					.then(response => {
						console.log(response)
						if (response.ok) {
							return response.json()
						}
						throw new Error("Ocurrió un error creando un nuevo método pago profesor")
					})
					.then(data => {
						console.log(data)
						// setStore({ isProfessorCreated: true })
						actions.getProfessorsPayment()
						return true
					})
					.catch(error => {
						console.log(error)
						return false
					})
			},

			// Agregar pago estudiante
			newStudentPayment: (data) => {
				const actions = getActions()
				return fetch(process.env.BACKEND_URL + "/api/addstudentpayment", {
					method: "POST",
					body: JSON.stringify(data),
					headers: { "Content-Type": "application/json" }
				})
					.then(response => {
						console.log(response)
						if (response.ok) {
							return response.json()
						}
						throw new Error("Ocurrió un error creando un nuevo método pago estudiante")
					})
					.then(data => {
						console.log(data)
						// setStore({ isProfessorCreated: true })
						actions.getStudentsPayment()
						return true
					})
					.catch(error => {
						console.log(error)
						return false
					})
			},

			// Agregar factura electronica
			newElectronicInvoice: (data) => {
				const actions = getActions()
				return fetch(process.env.BACKEND_URL + "/api/addelectronicinvoiceinfo", {
					method: "POST",
					body: JSON.stringify(data),
					headers: { "Content-Type": "application/json" }
				})
					.then(response => {
						console.log(response)
						if (response.ok) {
							return response.json()
						}
						throw new Error("Ocurrió un error creando una nueva factura electrónica")
					})
					.then(data => {
						console.log(data)
						// setStore({ isProfessorCreated: true })
						actions.getElectronicInvoices()
						return true
					})
					.catch(error => {
						console.log(error)
						return false
					})
			},

			// Registrar nuevo curso
			registerNewCourse: (data) => {
				const actions = getActions()
				return fetch(process.env.BACKEND_URL + "/api/registernewcourse", {
					method: "POST",
					body: JSON.stringify(data),
					headers: { "Content-Type": "application/json" }
				})
					.then(response => {
						console.log(response)
						if (response.ok) {
							return response.json()
						}
						throw new Error("Ocurrió un error al registar un nuevo curso")
					})
					.then(data => {
						console.log(data)
						// setStore({ isProfessorCreated: true })
						actions.getRegisteredCourses()
						return true
					})
					.catch(error => {
						console.log(error)
						return false
					})
			},

		}
	}
};

export default getState;