const $table = document.querySelector(".crud-table"),
	$form = document.querySelector(".crud-form"),
	$title = document.querySelector(".crud-title"),
	$template = document.querySelector("#crud-template").content,
	$fragment = document.createDocumentFragment();

const ajax = (options) => {
	let { url, method, success, error, data } = options;
	const xhr = new XMLHttpRequest();

	xhr.addEventListener("readystatechange", (e) => {
		if (xhr.readyState !== 4) return;

		if (xhr.status >= 200 && xhr.status < 300) {
			let json = JSON.parse(xhr.responseText);
			success(json);
		} else {
			let message = xhr.statusText || "Hubo un error";
			error(`Error ${xhr.status}: ${message}`);
		}
	});

	xhr.open(method || "GET", url);
	xhr.setRequestHeader("Content-Type", "application/json; charset=UTF-8");
	xhr.send(JSON.stringify(data));
};

const getAllUsers = (res, err) => {
	ajax({
		method: "GET",
		url: "http://localhost:3000/vip-users",
		success: (res) => {
			console.log(res);

			res.forEach((el) => {
				$template.querySelector(".name").textContent = el.name;
				$template.querySelector(".email").textContent = el.email;
				$template.querySelector(".edit-btn").dataset.id = el.id;
				$template.querySelector(".edit-btn").dataset.name = el.name;
				$template.querySelector(".edit-btn").dataset.email = el.email;

				let $clone = document.importNode($template, true);
				$fragment.appendChild($clone);
			});

			$table.querySelector("tbody").appendChild($fragment);
		},
		error: (err) => {
			console.log(err);
			$table.insertAdjacentHTML("afterend", `<p><b>${err}</b></p>`);
		},
		data: null,
	});
};

document.addEventListener("DOMContentLoaded", getAllUsers);

$form.addEventListener("submit", (e) => {
	e.preventDefault();

	if (!e.target.id.value) {
		// Create - POST
		ajax({
			url: "http://localhost:3000/vip-users",
			method: "POST",
			success: (res) => location.reload(),
			error: (err) =>
				$form.insertAdjacentHTML("afterend", `<p><b>${err}</b></p>`),
			data: {
				name: e.target.name.value,
				email: e.target.email.value,
			},
		});
	} else {
		// Update - PUT
		ajax({
			url: `http://localhost:3000/vip-users/${e.target.id.value}`,
			method: "PUT",
			success: (res) => location.reload(),
			error: (err) =>
				$form.insertAdjacentHTML("afterend", `<p><b>${err}</b></p>`),
			data: {
				name: e.target.name.value,
				email: e.target.email.value,
			},
		});
	}
});

document.addEventListener("click", (e) => {
	if (e.target.matches(".edit-btn")) {
		// $title.textContent = "Editar usuario";
		$form.name.value = e.target.dataset.name;
		$form.email.value = e.target.dataset.email;
		$form.id.value = e.target.dataset.id;
	}

	if (e.target.matches(".delete-btn")) {
		let isDelete = confirm(
			`Seguro que quieres eliminar al usuario ${e.target.dataset.id}?`
		);

		if (isDelete) {
			//Delete - DELETE
			ajax({
				url: `http://localhost:3000/vip-users/${e.target.dataset.id}`,
				method: "DELETE",
				success: (res) => location.reload(),
				error: (err) => alert(err),
			});
		}
	}
});
