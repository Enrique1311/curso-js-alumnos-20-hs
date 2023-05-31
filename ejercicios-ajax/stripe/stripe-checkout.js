import STRIPE_KEYS from "./assets/stripe-keys.js";

const $products = document.getElementById("products"),
	$template = document.getElementById("product-template").content,
	$fragment = document.createDocumentFragment(),
	fetchOptions = {
		headers: {
			Authorization: `Bearer ${STRIPE_KEYS.secret}`,
		},
	};

let products, prices;

const moneyFormat = (num) => `$ ${num.slice(0, -2)},${num.slice(-2)}`;

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
			$template.querySelector("figcaption").innerHTML = `<h3>${
				productData[0].name
			}</h3> <br> <p>${productData[0].description}</p><br> ${moneyFormat(
				el.unit_amount_decimal
			)} ${el.currency} `;

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

document.addEventListener("click", (e) => {
	if (e.target.matches(".product *")) {
		let price = e.target.parentElement.getAttribute("data-price");

		Stripe(STRIPE_KEYS.public)
			.redirectToCheckout({
				lineItems: [{ price: price, quantity: 1 }],
				mode: "payment",
				successUrl:
					"http://127.0.0.1:5500/ejercicios-ajax/stripe/assets/stripe-success.html",
				cancelUrl:
					"http://127.0.0.1:5500/ejercicios-ajax/stripe/assets/stripe-cancel.html",
			})
			.then((res) => {
				console.log(res);
				if (res.error) {
					$products.insertAdjacentElement("afterend", res.error.message);
				}
			});
	}
});
