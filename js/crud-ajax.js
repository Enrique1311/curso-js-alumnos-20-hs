const $table = document.querySelector(".crud-table"),
	$form = document.querySelector(".crud-form"),
	$title = document.querySelector(".crud-title"),
	$template = document.querySelector("#crud-template").content,
	$fragment = document.createDocumentFragment();

	const ajax = (options)=>{
		let (url, method, success,error, data) = options;
		const xhr = new XMLHttpRequest();

		xhr.addEventListener("readystatechange",e =>{
			if (xhr.readyState !== 4)  return;

			if (xhr.status !== 200 && xhr.status < 300) {
				let json = JSON.parse(xhr.responseText);
				success(json)
			} else {
				let message =xhr.statusText || "Hubo un error";
				error(`Error ${xhr.status}: ${message}`)
			}
		})

		xhr.open(method || "GET", url);
		xhr.setRequestHeader("Content-Type", "application/json; charset=UTF-8");
		xhr.send(JSON.stringify(data));
	}
