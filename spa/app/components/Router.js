import api from "../helpers/wordpress_api.js";
import { ajax } from "../helpers/ajax.js";
import { PostCard } from "./PostCard.js";

export async function Router() {
	const $main = document.getElementById("main");

	let { hash } = location;
	// console.log(hash);

	$main.innerHTML = null;

	if (!hash || hash === "#/") {
		await ajax({
			url: api.POSTS,
			cbSuccess: (posts) => {
				//console.log(posts);
				let html = "";
				posts.forEach((post) => (html += PostCard(post)));

				document.getElementById("main").innerHTML = html;
			},
		});
	} else if (hash.includes("#/search")) {
		$main.innerHTML = "<h2>Sección del buscador</h2>";
	} else if (hash === "#/contact") {
		$main.innerHTML = "<h2>Sección de Contacto</h2>";
	} else {
		$main.innerHTML =
			"<h2>Aquí se cargará el contenido del Post seleccionado previamente</h2>";
	}

	document.querySelector(".loader").style.display = "none";
}
