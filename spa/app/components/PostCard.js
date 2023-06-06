export function PostCard(props) {
	let { title, date, slug, _embedded } = props;
	let dateFormat = new Date(date).toLocaleString();
	let imageUrl = _embedded["wp:featuredmedia"]
		? _embedded["wp:featuredmedia"][0].source_url
		: "../assets/favicon.png";

	return `
        <article class="post-card">
            <img src=${imageUrl} alt="${title.rendered}">
            <h2>${title.rendered}</h2>
            <p>
                <time datetime="${date}">${dateFormat}</time>
                <a href="#/${slug}">Ver publicación</a>
            </p>
        </article>

    `;
}
