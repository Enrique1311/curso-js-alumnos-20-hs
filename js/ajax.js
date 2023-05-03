// Petición con objeto XMLHttpRequest ***************
(() => {
	const xhr = new XMLHttpRequest(),
		$xhr = document.getElementById("xhr"),
		$fragment = document.createDocumentFragment();

	xhr.addEventListener("readystatechange", (e) => {
		if (xhr.readyState !== 4) return;

		if (xhr.status >= 200 && xhr.status < 300) {
			console.log("Éxito!");

			// Esta es la respuesta de la petición a la API en formato Json
			console.log(xhr.responseText);

			let json = JSON.parse(xhr.responseText);
			console.log(json);

			json.forEach((element) => {
				const $li = document.createElement("li");
				$li.innerHTML = `${element.name} - ${element.email} - ${element.phone}`;
				$fragment.appendChild($li);
			});
			$xhr.appendChild($fragment);
		} else {
			console.log("Error");
			let message = xhr.statusText || "Hubo un error!";
			$xhr.innerHTML = `Error ${xhr.status}: ${message}`;
		}
	});

	// Petición a la API
	xhr.open("GET", "https://jsonplaceholder.typicode.com/users");

	// // Petición a un archivo Json local
	// xhr.open("GET", "./../ejercicios-dom/assets/users.json");

	xhr.send();
})();

// Petición con la API Fetch ************************
(() => {
	const $fetch = document.getElementById("fetch"),
		$fragment = document.createDocumentFragment();

	fetch("https://jsonplaceholder.typicode.com/users")
		.then((res) => (res.ok ? res.json() : Promise.reject(res)))
		.then((json) => {
			console.log(json);
			json.forEach((element) => {
				const $li = document.createElement("li");
				$li.innerHTML = `${element.name} - ${element.email} - ${element.phone}`;
				$fragment.appendChild($li);
			});
			$fetch.appendChild($fragment);
		})
		.catch((error) => {
			console.log(error);
			let message = error.statusText || "Ocurrió un error";
			$fetch.innerHTML = `Error ${error.status}: ${message}`;
		})
		.finally(() => {
			console.log("Se ejecuta de cualquier manera...");
		});
})();

// Petición con Fetch-Async *******************************
(() => {
	const $fetchAsync = document.getElementById("fetch-async"),
		$fragment = document.createDocumentFragment();

	async function getData() {
		try {
			let res = await fetch("https://jsonplaceholder.typicode.com/users");
			let json = await res.json();
			console.log(res, json);

			if (!res.ok) throw { status: res.status, statusText: res.statusText };

			json.forEach((element) => {
				const $li = document.createElement("li");
				$li.innerHTML = `${element.name} - ${element.email} - ${element.phone}`;
				$fragment.appendChild($li);
			});
			$fetchAsync.appendChild($fragment);
		} catch (error) {
			let message = error.statusText || "Ocurrió un error";
			$fetchAsync.innerHTML = `Error ${error.status}: ${message}`;
		} finally {
			console.log("Esto se ejecuta más allá del try-catch");
		}
	}
	getData();
})();

// Peticiones con Axios ***********************************
(() => {
	const $axios = document.getElementById("axios"),
		$fragment = document.createDocumentFragment();

	axios
		.get("https://jsonplaceholder.typicode.com/users")
		.then((res) => {
			console.log(res);
			res.data.forEach((el) => {
				const $li = document.createElement("li");
				$li.innerHTML = `${el.name} - ${el.email} - ${el.phone}`;
				$fragment.appendChild($li);
			});
			$axios.appendChild($fragment);
		})
		.catch((error) => {
			let message = error.response.statusText || "Ocurrió un error";
			$axios.innerHTML = `Error ${error.response.status}: ${message}`;
		})
		.finally(console.log("Esto se ejecuta más allá del try-catch"));
})();

// Peticiones con Axios-Async ***********************************
(() => {
	const $axiosAsync = document.getElementById("axios-async"),
		$fragment = document.createDocumentFragment();

	async function getData() {
		try {
			let res = await axios.get("https://jsonplaceholder.typicode.com/users");
			let data = await res.data;
			console.log(data);

			data.forEach((el) => {
				const $li = document.createElement("li");
				$li.innerHTML = `${el.name} - ${el.email} - ${el.phone}`;
				$fragment.appendChild($li);
			});
			$axiosAsync.appendChild($fragment);
		} catch (error) {
			let message = error.response.statusText || "Ocurrió un error";
			$axiosAsync.innerHTML = `Error ${error.response.status}: ${message}`;
		} finally {
			console.log("Esto se ejecuta más allá del try-catch");
		}
	}
	getData();
})();
