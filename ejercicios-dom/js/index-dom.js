const $menuBtn = document.querySelector(".menu-btn");
const $mobileNavbar = document.querySelector(".mobile-navbar");
const $openIcon = document.querySelector(".open-icon");
const $closeIcon = document.querySelector(".close-icon");

function openCloseMenu() {
	$mobileNavbar.classList.toggle("active");
	$openIcon.classList.toggle("closed");
	$closeIcon.classList.toggle("closed");
}

$menuBtn.addEventListener("click", openCloseMenu);
$mobileNavbar.addEventListener("click", openCloseMenu);
