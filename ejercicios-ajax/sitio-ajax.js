const $main = document.querySelector("main");

const getHTML = (options) => {
	let { url, success, error } = options;
	const xhr = new XMLHttpRequest();

	xhr.addEventListener("readystatechange", (e) => {
		if (xhr.readyState !== 4) return;

		if (xhr.status >= 200 && xhr.status < 300) {
			let html = xhr.responseText;
			success(html);
		} else {
			let message = xhr.statusText || "Hubo un error!";
			error(`Error ${xhr.status}: ${message}`);
		}
	});

	xhr.open("GET", url);
	xhr.setRequestHeader("Content-Type", "text/html; charset=UTF-8");
	xhr.send();
};

document.addEventListener("DOMContentLoaded", (e) => {
	getHTML({
		url: "assets/home.html",
		success: (html) => ($main.innerHTML = html),
		error: (error) => ($main.innerHTML = `<h1>${error}</h1>`),
	});
});

document.addEventListener("click", (e) => {
	if (e.target.matches(".menu a")) {
		e.preventDefault();
		getHTML({
			url: e.target.href,
			success: (html) => ($main.innerHTML = html),
			error: (error) => ($main.innerHTML = `<h1>${error}</h1>`),
		});
	}
});
