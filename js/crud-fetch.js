const $table = document.querySelector(".crud-table"),
	$form = document.querySelector(".crud-form"),
	$title = document.querySelector(".crud-title"),
	$template = document.getElementById("crud-template").content,
	$fragment = document.createDocumentFragment();

const getAllUsers = async () => {
	try {
		let res = await fetch("http://localhost:5005/normal-users");
		let json = await res.json();

		if (!res.ok) throw { status: res.status, statusText: res.statusText };

		console.log(json);

		json.forEach((el) => {
			$template.querySelector(".name").textContent = el.name;
			$template.querySelector(".email").textContent = el.email;
			$template.querySelector(".edit-btn").dataset.id = el.id;
			$template.querySelector(".edit-btn").dataset.name = el.name;
			$template.querySelector(".edit-btn").dataset.email = el.email;
			$template.querySelector("delete-btn").dataset.id = el.id;

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
