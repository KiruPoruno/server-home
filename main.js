async function load() {
	let pages = await (await fetch("pages.json")).json();
	try {
		pages = await (await fetch("custom-pages.json")).json();
	}catch(err) {}

	for (let i = 0; i < pages.length; i++) {
		links.innerHTML += `<div class="link link${i}">${pages[i].name}</div>`;
		let link = document.querySelector(".link" + i);
		link.setAttribute("onclick", `location.href = "${location.protocol}//${window.location.hostname}:${pages[i].port}"`);

		if (pages[i].port != "") {
			link.innerHTML += `<div class="url">on port ${pages[i].port}</div>`
		} else if (pages[i].url != "") {
			link.innerHTML += `<div class="url">${pages[i].url}</div>`
		}
	}
}; load()
