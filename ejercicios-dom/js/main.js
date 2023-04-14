const $menuIcon = document.querySelector(".menu-icon");
const $menu = document.querySelector(".menu");

function openCloseMenu() {
	$menu.classList.toggle("inactive");
}

$menuIcon.addEventListener("click", openCloseMenu);
