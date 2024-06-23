const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			administrators: [],

			professors: [],

			students: [],

			courses: [],

			modalities: [],

			professorpayment: [],

			studentpayment: [],

			electronicinvoices: [],
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
						console.log("Data: ", data)
						console.log(data.data)
						setStore({ administrators: data.data })
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
						console.log("Data: ", data)
						console.log(data)
						setStore({ professors: data })
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
						console.log("Data: ", data)
						console.log(data)
						setStore({ students: data })
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
						console.log({ "courses": data })
						setStore({ courses: data })
					})
					.catch((error) => {
						console.log(error)
					})
			},
		}
	}
};

export default getState;