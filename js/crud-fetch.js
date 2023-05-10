const $table = document.querySelector(".crud-table"),
	$form = document.querySelector(".crud-form"),
	$title = document.querySelector(".crud-title"),
	$template = document.getElementById("crud-template").content,
	$fragment = document.createDocumentFragment();

const getAllUsers = async () => {
	try {
		let res = await fetch("http://localhost:3000/vip-users");
		let json = await res.json();

		if (!res.ok) throw { status: res.status, statusText: res.statusText };

		console.log(json);

		json.forEach((el) => {
			$template.querySelector(".name").textContent = el.name;
			$template.querySelector(".email").textContent = el.email;
			$template.querySelector(".edit-btn").dataset.id = el.id;
			$template.querySelector(".edit-btn").dataset.name = el.name;
			$template.querySelector(".edit-btn").dataset.email = el.email;
			$template.querySelector(".delete-btn").dataset.id = el.id;

			let $clone = document.importNode($template, true);
			$fragment.appendChild($clone);
		});

		$table.querySelector("tbody").appendChild($fragment);
	} catch (err) {
		let message = err.statusText || "Hubo un error";
		$table.insertAdjacentHTML(
			"afterend",
			`<p><b>Error ${err.status}: ${message}</b></p>`
		);
	}
};

document.addEventListener("DOMContentLoaded", getAllUsers);

document.addEventListener("submit", async (e) => {
	if (e.target === $form) {
		e.preventDefault();

		if (!e.target.id.value) {
			// Create - POST
			try {
				let options = {
					method: "POST",
					headers: {
						"Content-Type": "application/json;charset=utf-8",
					},
					body: JSON.stringify({
						name: e.target.name.value,
						email: e.target.email.value,
					}),
				};
				let res = await fetch("http://localhost:3000/vip-users", options);
				let json = await res.json();

				if (!res.ok)
					throw {
						status: res.status,
						statusText: res.statusText,
					};

				location.reload();
			} catch (error) {
				let message = error.statusText || "Hubo un error";
				$form.insertAdjacentHTML(
					"afterend",
					`<p><b>Error ${error.status}: ${message}</b></p>`
				);
			}
		} else {
			//Update - PUT
			try {
				let options = {
					method: "PUT",
					headers: { "Content-Type": "application/json;charset=utf-8" },
					body: JSON.stringify({
						name: e.target.name.value,
						email: e.target.email.value,
					}),
				};
				let res = await fetch(
					`http://localhost:3000/vip-users/${e.target.id.value}`,
					options
				);
				let json = await res.json();

				if (!res.ok)
					throw { status: res.statusText, statusText: res.statusText };

				location.reload();
			} catch (error) {
				let message = error.statusText || "Hubo un error";
				$form.insertAdjacentHTML(
					"afterend",
					`<p><b>Error ${error.status}: ${message}</b></p>`
				);
			}
		}
	}
});

document.addEventListener("click", async (e) => {
	if (e.target.matches(".edit-btn")) {
		$title.textContent = "Editar usuario";
		$form.name.value = e.target.dataset.name;
		$form.email.value = e.target.dataset.email;
		$form.id.value = e.target.dataset.id;
	}

	if (e.target.matches(".delete-btn")) {
		let isDelete = confirm(
			`¿Seguro que quires eliminar al usuario con id ${e.target.dataset.id}?`
		);
		if (isDelete) {
			//Delete - DELETE
			try {
				let options = {
					method: "DELETE",
					headers: {
						"Content-type": "application/json; charset=utf-8",
					},
				};
				let res = await fetch(
					`http://localhost:3000/vip-users/${e.target.dataset.id}`,
					options
				);
				let json = await res.json();

				if (!res.ok) throw { status: res.status, statusText: res.statusText };

				location.reload();
			} catch (error) {
				let message = error.statusText || "Hubo un error";
				alert(`Error ${error.status}: ${message}`);
			}
		}
	}
});
