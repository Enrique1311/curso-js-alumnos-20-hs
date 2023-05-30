import STRIPE_KEYS from "./stripe-keys.js";

const $products = document.getElementById("products"),
	$template = document.getElementById("product-template").content,
	$fragment = document.createDocumentFragment(),
	fetchOptions = {
		headers: {
			Authorization: `Bearer ${STRIPE_KEYS.secret}`,
		},
	};

let products, prices;

Promise.all([
	fetch("https://api.stripe.com/v1/products", fetchOptions),
	fetch("https://api.stripe.com/v1/prices", fetchOptions),
])
	.then((responses) => Promise.all(responses.map((res) => res.json())))
	.then((json) => {
		//console.log(json);
		products = json[0].data;
		prices = json[1].data;
		console.log(products, prices);

		prices.forEach((el) => {
			let productData = products.filter((product) => product.id === el.product);
			console.log(productData);

			$template.querySelector(".product").setAttribute("data-price", el.id);
			$template.querySelector("img").src = productData[0].images[0];
			$template.querySelector("img").alt = productData[0].name;
			$template.querySelector(
				"figcaption"
			).innerHTML = `${productData[0].name} <br> ${el.currency} ${el.unit_amount_decimal} `;

			let $clone = document.importNode($template, true);
			$fragment.appendChild($clone);
		});

		$products.appendChild($fragment);
	})

	.catch((err) => {
		console.log(err);
		let message = err.statusText || "Ocurrió un error al conectarse con Stripe";
		$products.innerHTML = `<p>Error ${err.status}; ${message}</p>`;
	});
