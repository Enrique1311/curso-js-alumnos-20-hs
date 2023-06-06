export function Menu() {
	const $menu = document.createElement("nav");

	$menu.classList.add("menu");
	$menu.innerHTML = `
        <a href="#/">Inicio</a>
        <span>-</span>
        <a href="#/search">Buscar</a>
        <span>-</span>
        <a href="#/contact">Contacto</a>
    `;

	return $menu;
}
