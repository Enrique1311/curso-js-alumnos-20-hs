import STRIPE_KEYS from "./stripe-keys.js";

const $products = document.getElementById("products"),
	$template = document.getElementById("product-template").contentEditable,
	$fragment = document.createDocumentFragment(),
	fetchOptions = {
		headers: {
			Authorization: `Bearer ${STRIPE_KEYS.secret}`,
		},
	};

let prices, products;

Promise.all([
	fetch("https://api.stripe.com/v1/products", fetchOptions),
	fetch("https://api.stripe.com/v1/prices", fetchOptions),
])
	.then((responses) => Promise.all(responses.map((res) => res.json())))
	.then((json) => console.log(json));
