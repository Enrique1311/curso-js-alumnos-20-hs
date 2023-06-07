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
		console.log(api.POST);
	} else if (hash.includes("#/search")) {
		$main.innerHTML = "<h2>Sección del buscador</h2>";
	} else if (hash === "#/contact") {
		$main.innerHTML = "<h2>Sección de Contacto</h2>";
	} else {
		await ajax({
			url: `{api.POST}/${localStorage.getItem("wpPostId")}`,
			cbSuccess: (post) => {
				console.log(post);
				// let html = "";
				// posts.forEach((post) => (html += PostCard(post)));
				// $main.innerHTML = html;
			},
		});
	}

	document.querySelector(".loader").style.display = "none";
}
