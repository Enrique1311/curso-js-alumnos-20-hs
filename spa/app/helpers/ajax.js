export function ajax(props) {
	let { url, cbSuccess } = props;

	fetch(url)
		.then((res) => (res.ok ? res.json() : Promise.reject(res)))
		.then((json) => cbSuccess(json))
		.catch((error) => {
			let message = error.statusText || "Hubo un error al acceder a la API";

			document.getElementById("root").innerHTML = `
                <div class="error">
                    <p>Error ${error.status}: ${message}</p>
                </div>
            `;

			console.log(error);
		});
}
