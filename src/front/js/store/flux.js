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
			
			isProfessorCreated: false,
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
						setStore({ studentspayment: data.studpays})
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
			newAdministrator: () => {
				fetch(process.env.BACKEND_URL + "/api/administrator",{
					method:"POST",
					body: JSON.stringify(),
					headers: { "Content-Type": "application/json" }
				})
				.then(response => response())
				.then(data => {setStore(data.administrators)})
				.catch(error => error)
			},
			// newProfessor: async () => {
			// 	try {
			// 		// fetching data from the backend
			// 		const resp = await fetch(process.env.BACKEND_URL + "/api/professor", { method: ['POST'], headers: { "Content-Type": "application/json" }, body: JSON.stringify() })
			// 		const data = await resp.json()
			// 		//setStore({ message: data.message })
			// 		// don't forget to return something, that is how the async resolves
			// 		return data;
			// 	} catch (error) {
			// 		console.log("Error loading message from backend", error)
			// 	}
			// },
			// Agregar profesor
			newProfessor: (object) => {
				// const store = getStore()
				fetch(process.env.BACKEND_URL + "/api/professor",{
					method:"POST",
					body: JSON.stringify(object),
					headers: { "Content-Type": "application/json" }
				})
				.then(response => {console.log(response)
					if (response.ok){
						setStore({isProfessorCreated:true})
					}
					return response.json()
				})
				.then(data => data)
				.catch(error => error)
			},

			// Agregar estudiante
			newStudent: () => {
				fetch(process.env.BACKEND_URL + "/api/student",{
					method:"POST",
					body: JSON.stringify(),
					headers: { "Content-Type": "application/json" }
				})
				.then(response => response())
				.then(data => {setStore(data.students)})
				.catch(error => error)
			},

			// Agregar curso
			newCourse: () => {
				fetch(process.env.BACKEND_URL + "/api/course",{
					method:"POST",
					body: JSON.stringify(),
					headers: { "Content-Type": "application/json" }
				})
				.then(response => response())
				.then(data => {setStore(data.courses)})
				.catch(error => error)
			},

			// Agregar modalidad
			newModality: () => {
				fetch(process.env.BACKEND_URL + "/api/modality",{
					method:"POST",
					body: JSON.stringify(),
					headers: { "Content-Type": "application/json" }
				})
				.then(response => response())
				.then(data => {setStore(data.modalities)})
				.catch(error => error)
			},

			// Agregar pago profesor
			newProfessorPayment: () => {
				fetch(process.env.BACKEND_URL + "/api/professorpayment",{
					method:"POST",
					body: JSON.stringify(),
					headers: { "Content-Type": "application/json" }
				})
				.then(response => response())
				.then(data => {setStore(data.professorspayment)})
				.catch(error => error)
			},

			// Agregar pago estudiante
			newStudentPayment: () => {
				fetch(process.env.BACKEND_URL + "/api/studentpayment",{
					method:"POST",
					body: JSON.stringify(),
					headers: { "Content-Type": "application/json" }
				})
				.then(response => response())
				.then(data => {setStore(data.studentspayment)})
				.catch(error => error)
			},

			// Agregar factura electronica
			newElectronicInvoice: () => {
				fetch(process.env.BACKEND_URL + "/api/electronicinvoice",{
					method:"POST",
					body: JSON.stringify(),
					headers: { "Content-Type": "application/json" }
				})
				.then(response => response())
				.then(data => {setStore(data.electronicinvoices)})
				.catch(error => error)
			},

			// Agregar nuevo curso
			newnewCourse: () => {
				fetch(process.env.BACKEND_URL + "/api/newcourse",{
					method:"POST",
					body: JSON.stringify(),
					headers: { "Content-Type": "application/json" }
				})
				.then(response => response())
				.then(data => {setStore(data.newcourses)})
				.catch(error => error)
			},
			
		}
	}
};

export default getState;