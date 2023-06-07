export function PostCard(props) {
	let { title, id, date, slug, _embedded } = props;
	let dateFormat = new Date(date).toLocaleString();
	let imageUrl = _embedded["wp:featuredmedia"]
		? _embedded["wp:featuredmedia"][0].source_url
		: "../assets/favicon.png";

	document.addEventListener("click", (e) => {
		if (!e.target.matches(".post-card a")) return false;
		localStorage.setItem("wpPostId", e.target.dataset.id);
	});

	return `
        <article class="post-card">
            <img src=${imageUrl} alt="${title.rendered}">
            <h2>${title.rendered}</h2>
            <p>
                <time datetime="${date}">${dateFormat}</time>
                <a href="#/${slug}" data-id="${id}">Ver publicación</a>
            </p>
        </article>

    `;
}
