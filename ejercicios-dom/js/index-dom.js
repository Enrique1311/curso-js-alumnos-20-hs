// Menu *************************************************
const $menuBtn = document.querySelector(".menu-btn");
const $navbar = document.querySelector(".navbar");
const $openIcon = document.querySelector(".open-icon");
const $closeIcon = document.querySelector(".close-icon");

function openCloseMenu() {
	$navbar.classList.toggle("active");
	$openIcon.classList.toggle("closed");
	$closeIcon.classList.toggle("closed");
}

$menuBtn.addEventListener("click", openCloseMenu);
$navbar.addEventListener("click", openCloseMenu);

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
const $scrollTopBtn = document.querySelector(".scroll-top-btn");

function scrollToTop() {
	let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
	if (scrollTop > 10) {
		$scrollTopBtn.classList.remove("hidden");
	} else {
		$scrollTopBtn.classList.add("hidden");
	}
}
window.addEventListener("scroll", scrollToTop);
$scrollTopBtn.addEventListener("click", (e) => {
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

// Ventana emergente ****************************************
const $openWindowBtn = document.querySelector(".open-window-btn");
const $closeWindowBtn = document.querySelector(".close-window-btn");
let ventana;
function openWindow() {
	ventana = window.open(
		"https://sp.booking.com/index.html?aid=1535089&label=esar-edge-ntp-topsites-curate-ana",
		"ventana",
		"width=600,height=400"
	);
}

function closeWindow() {
	ventana.window.close();
}

$openWindowBtn.addEventListener("click", openWindow);
$closeWindowBtn.addEventListener("click", closeWindow);

// Detección de Dispositivos **********************************
const $id = document.querySelector("#user-device");
const isMobile = {
	android: () => navigator.userAgent.match(/android/i),
	ios: () => navigator.userAgent.match(/iphone|ipad|ipod/i),
	any: function () {
		return this.android() || this.ios();
	},
};
const isDesktop = {
	linux: () => navigator.userAgent.match(/linux/i),
	mac: () => navigator.userAgent.match(/mac os/i),
	windows: () => navigator.userAgent.match(/windows nt/i),
	any: function () {
		return this.linux() || this.mac() || this.windows();
	},
};
const isBrowser = {
	chrome: () => navigator.userAgent.match(/chrome/i),
	safari: () => navigator.userAgent.match(/safari/i),
	firefox: () => navigator.userAgent.match(/firefox/i),
	opera: () => navigator.userAgent.match(/opera|opera mini/i),
	ie: () => navigator.userAgent.match(/msie|iemobile/i),
	edge: () => navigator.userAgent.match(/edge/i),
	any: function () {
		return (
			this.chrome() ||
			this.safari() ||
			this.firefox() ||
			this.opera() ||
			this.ie() ||
			this.edge()
		);
	},
};
$id.innerHTML = `<ul>
<li>User Agent: <b>${navigator.userAgent}</b></li>
<li>Plataforma: <b>${isMobile.any() ? isMobile.any() : isDesktop.any()}</b></li>
<li>Navegador: <b>${isBrowser.any()}</b></li></ul>`;

// Contenido exclusivo para cada dispositivo
if (isBrowser.chrome()) {
	$id.innerHTML += `<p><mark>Esto sólo se ve en Chrome.</mark></p>`;
}
if (isBrowser.safari()) {
	$id.innerHTML += `<p><mark>Esto sólo se ve en Safari.</mark></p>`;
}
if (isBrowser.firefox()) {
	$id.innerHTML += `<p><mark>Esto sólo se ve en Firefox.</mark></p>`;
}
if (isBrowser.opera()) {
	$id.innerHTML += `<p><mark>Esto sólo se ve en Opera.</mark></p>`;
}
if (isBrowser.ie()) {
	$id.innerHTML += `<p><mark>Esto sólo se ve en Chrome.</mark></p>`;
}
if (isBrowser.edge()) {
	$id.innerHTML += `<p><mark>Esto sólo se ve en Edge.</mark></p>`;
}

// Redirecciones **********************************************
if (isMobile.android()) {
	const $div = document.createElement("div");
	window.location.href = "https://www.youtube.com/";
}

// Estado de la red *******************************************
const isOnline = () => {
	const $div = document.createElement("div");
	if (navigator.onLine) {
		$div.textContent = "Conección reestablecida";
		$div.classList.add("online");
		$div.classList.remove("offline");
	} else {
		$div.textContent = "Conexión perdida";
		$div.classList.add("offline");
		$div.classList.remove("online");
	}
	document.body.insertAdjacentElement("afterbegin", $div);
	setTimeout(() => document.body.removeChild($div), 2000);
};
window.addEventListener("online", (e) => isOnline());
window.addEventListener("offline", () => isOnline());

// Detección de la cámara web **********************************
const $startCameraBtn = document.querySelector(".start-webcam-btn");

function startWebcam() {
	const $video = document.querySelector(".webcam");

	if (navigator.mediaDevices.getUserMedia) {
		navigator.mediaDevices
			.getUserMedia({ video: true, audio: true })
			.then((strem) => {
				$video.srcObject = strem;
				$video.play();
			})
			.catch((error) => {
				$video.insertAdjacentHTML(
					"beforebegin",
					`<p class="error"><mark>${error}</mark></p>`
				);
			});
	}
}
$startCameraBtn.addEventListener("click", startWebcam);

// Geolocalización ******************************************
const $geolocation = document.querySelector("#geolocation");
const options = { enableHighAccuracy: true, timeout: 5000, maximumAge: 0 };

const success = (position) => {
	$geolocation.innerHTML = `
	<p>Tu posición es:</p>
	<ul>
		<li>Latitud:<b>${position.coords.latitude}</b></li>
		<li>Longitud:<b>${position.coords.longitude}</b></li>
		<li>Presición:<b>${position.coords.accuracy}</b> metros</li>
	</ul>
	<button><a href="https://www.google.com/maps/@${position.coords.latitude},${position.coords.longitude},20z" target="_blank" rel="noopener">Ver en Google Maps<i class="fa-solid fa-location-dot"></i></a></button>
	`;
	console.log(position);
};
const error = (err) => {
	$geolocation.innerHTML = `<p><mark>${err.message}</mark></p>`;
	console.log(err);
};

navigator.geolocation.getCurrentPosition(success, error, options);

// Filtro ***************************************************
document.addEventListener("keyup", (e) => {
	if (e.target.matches(".card-filter")) {
		if (e.key === "Escape") e.target.value = "";

		document.querySelectorAll(".card").forEach((el) => {
			el.textContent.toLocaleLowerCase().includes(e.target.value)
				? el.classList.remove("filter")
				: el.classList.add("filter");
		});
	}
});

// Sorteo Digital ********************************************
const $winnerBtn = document.querySelector(".winner-btn");

const getWinner = () => {
	const $players = document.querySelectorAll(".player");
	const random = Math.floor(Math.random() * $players.length);
	const winner = $players[random];

	alert(`El ganador es: ${winner.textContent}.`);
};

$winnerBtn.addEventListener("click", getWinner);

// Responsive Slider *****************************************
const $slideContent = document.querySelectorAll(".slide-content");
const $prevBtn = document.querySelector(".prev-button");
const $nextBtn = document.querySelector(".next-button");
let i = 0;

const prevSlide = (e) => {
	e.preventDefault();
	$slideContent[i].classList.remove("active");
	i--;
	if (i < 0) {
		i = $slideContent.length - 1;
	}
	$slideContent[i].classList.add("active");
};

const nextSlide = (e) => {
	e.preventDefault();
	$slideContent[i].classList.remove("active");
	i++;
	if (i > $slideContent.length - 1) {
		i = 0;
	}
	$slideContent[i].classList.add("active");
};

$prevBtn.addEventListener("click", prevSlide);
$nextBtn.addEventListener("click", nextSlide);

// Scroll Spy *************************************
const $sections = document.querySelectorAll("section[data-scroll-spy]");
const cb = (entries) => {
	console.log("entries:", entries);

	entries.forEach((entry) => {
		console.log("entry:", entry);
		const id = entry.target.getAttribute("id");
		if (entry.isIntersecting) {
			document
				.querySelector(`a[data-scroll-spy][href="#${id}"]`)
				.classList.add("active");
		} else {
			document
				.querySelector(`a[data-scroll-spy][href="#${id}"]`)
				.classList.remove("active");
		}
	});
};

const observer = new IntersectionObserver(cb, { threshold: [0.5, 0.75] });
$sections.forEach((el) => observer.observe(el));

// Videos inteligentes ****************************
function smartVideo() {
	const $videos = document.querySelectorAll("video[data-smart-video]");

	const callback = (entries) => {
		entries.forEach((entry) => {
			if (entry.isIntersecting) {
				entry.target.play();
			} else {
				entry.target.pause();
			}

			// Para que cuando se cambia de página en el navegador el video se pausa
			// y cuando se vuelve a la página del video, se reproduce desde donde estaba.
			window.addEventListener("visibilitychange", (e) =>
				document.visibilityState === "visible"
					? entry.target.play()
					: entry.target.pause()
			);
		});
	};
	const observer = new IntersectionObserver(callback, { threshold: 0.5 });

	$videos.forEach((el) => observer.observe(el));
}
smartVideo();

// Validaciones de formularios
function contactFormValidations() {
	const $form = document.querySelector(".contact-form");
	const $inputs = document.querySelectorAll(".contact-form [required]");

	$inputs.forEach((input) => {
		const $span = document.createElement("span");
		$span.id = input.name;
		$span.textContent = input.title;
		$span.classList.add("contact-form-error", "none");
		input.insertAdjacentElement("afterend", $span);
	});

	document.addEventListener("keyup", (e) => {
		if (e.target.matches(".contact-form [required]")) {
			let pattern = e.target.pattern || e.target.dataset.pattern;

			if (pattern && e.target.value !== "") {
				let regex = new RegExp(pattern);
				return !regex.exec(e.target.value)
					? document.getElementById(e.target.name).classList.add("is-active")
					: document
							.getElementById(e.target.name)
							.classList.remove("is-active");
			}
			if (!pattern) {
				return e.target.value === ""
					? document.getElementById(e.target.name).classList.add("is-active")
					: document
							.getElementById(e.target.name)
							.classList.remove("is-active");
			}
		}
	});
}
contactFormValidations();
