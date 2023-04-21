// Mobile Menu *************************************************
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

// Clock and Music **********************************************
const $clockInit = document.querySelector(".clock-init");
const $clockStop = document.querySelector(".clock-stop");
const $musicInit = document.querySelector(".music-init");
const $musicStop = document.querySelector(".music-stop");
const $clock = document.querySelector(".clock");

let clockTime;

function startClock() {
	clockTime = setInterval(() => {
		let clockHour = new Date().toLocaleTimeString();
		$clock.innerHTML = `<h3>${clockHour}</h3>`;
	}, 1000);
	$clockInit.disabled = true;
}
function stopClock() {
	clearInterval(clockTime);
	$clock.innerHTML = null;
	$clockInit.disabled = false;
}

let musicTime;
const $music = document.createElement("audio");

function startMusic() {
	$music.src = "../assets/05 Mr. Brownstone.mp3";
	musicTime = setTimeout(() => {
		$music.play();
	}, 1000);
	$musicInit.disabled = true;
}
function stopMusic() {
	clearTimeout(musicTime);
	$music.pause();
	$music.currentTime = 0;
	$musicInit.disabled = false;
}

$clockInit.addEventListener("click", startClock);
$clockStop.addEventListener("click", stopClock);
$musicInit.addEventListener("click", startMusic);
$musicStop.addEventListener("click", stopMusic);

// Eventos del Teclado ********************************************
const $ball = document.querySelector(".ball");
const $stage = document.querySelector(".stage");
let x = 0;
let y = 0;

function moveBall(e) {
	let limitsBall = $ball.getBoundingClientRect();
	let limitsStage = $stage.getBoundingClientRect();

	switch (e.keyCode) {
		case 37:
			e.preventDefault();
			if (limitsBall.left > limitsStage.left + 3) x--;
			break;
		case 38:
			e.preventDefault();
			if (limitsBall.top > limitsStage.top) y--;
			break;
		case 39:
			e.preventDefault();
			if (limitsBall.right < limitsStage.right - 3) x++;
			break;
		case 40:
			e.preventDefault();
			if (limitsBall.bottom < limitsStage.bottom) y++;
			break;
		default:
			break;
	}
	$ball.style.transform = `translate(${x * 5}px,${y * 5}px)`;
}

document.addEventListener("keydown", moveBall);

// Scroll Top Button ************************************
function scrollToTop() {
	const $scrollTopBtn = document.querySelector(".scroll-top-btn");
	let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
	if (scrollTop > 10) {
		$scrollTopBtn.classList.remove("hidden");
	} else {
		$scrollTopBtn.classList.add("hidden");
	}
}
window.addEventListener("scroll", scrollToTop);
document.addEventListener("click", (e) => {
	window.scrollTo({ brehavior: "smooth", top: 0 });
});

// Dark Theme *******************************************
const $themeBtn = document.querySelector(".theme-btn");
const $mainContext = document.querySelector(".main-context");
const $sunIcon = document.querySelector(".sun-icon");
const $moonIcon = document.querySelector(".moon-icon");

function lightMode() {
	$mainContext.classList.remove("dark-theme");
	$mainContext.classList.add("light-theme");
	$moonIcon.classList.remove("inactive");
	$sunIcon.classList.add("inactive");
	localStorage.setItem("theme", "light");
}

function darkMode() {
	$mainContext.classList.remove("light-theme");
	$mainContext.classList.add("dark-theme");
	$sunIcon.classList.remove("inactive");
	$moonIcon.classList.add("inactive");
	localStorage.setItem("theme", "dark");
}

$themeBtn.addEventListener("click", () => {
	if (localStorage.getItem("theme") === "light") {
		darkMode();
	} else {
		lightMode();
	}
});

document.addEventListener("DOMContentLoaded", () => {
	if (localStorage.getItem("theme") === "light") {
		lightMode();
	}
	if (localStorage.getItem("theme") === "dark") {
		darkMode();
	}
});
