const $table = document.querySelector(".crud-table"),
	$form = document.querySelector(".crud-form"),
	$title = document.querySelector(".crud-title"),
	$template = document.querySelector("#crud-template").content,
	$fragment = document.createDocumentFragment();

const getAllUsers = async () => {
	try {
		let res = await axios.get("http://localhost:3000/vip-users");
		let json = await res.data;

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
	} catch (error) {
		let message = error.statusText || "Hubo un error";
		$table.insertAdjacentHTML(
			"afterend",
			`<p><b>Error ${error.status}: ${message}</b></p>`
		);
	}
};

document.addEventListener("DOMContentLoaded", getAllUsers);

document.addEventListener("DOMContentLoaded", async (e) => {
	if (e.target === $form) {
		e.preventDefault();

		if (e.target.id.value) {
			// Create - POST
			try {
				let options = {
					method: "POST",
					headers: {
						"Content-Type": "aplication/json;charset=utf-8",
					},
					data: JSON.stringify({
						name: e.target.name.value,
						email: e.target.email.value,
					}),
				};
				let res = await axios("http://localhost:3000/vip-users", options);
				let json = await res.data;

				location.reload();
			} catch (error) {
				let message = error.statusText || "Hubo un error";
				$form.insertAdjacentHTML(
					"afterend",
					`<p><b>Error ${error.status}: ${message}</b></p>`
				);
			}
		} else {
			// Update - POST
		}
	}
});
