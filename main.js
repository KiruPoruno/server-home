async function load() {
	let prefs = await (await fetch("settings.json")).json();
	try {
		prefs = await (await fetch("custom-settings.json")).json();
	}catch(err) {}

	document.title = prefs.title;

	for (let i = 0; i < prefs.pages.length; i++) {
		main.innerHTML += `<div class="header">${prefs.pages[i].title}</div>`;
		main.innerHTML += `<div class="links title-${prefs.pages[i].title + i}"></div>`;
		for (let ii = 0; ii < prefs.pages[i].links.length; ii++) {
			let pref = prefs.pages[i].links[ii];
			let links = document.querySelector(`.title-${prefs.pages[i].title + i}`);

			links.innerHTML += `<div class="link link-${i + '' + ii}">${pref.name}</div>`;
			let link = document.querySelector(".link-" + i + '' + ii);

			if (pref.description) {
				link.innerHTML += `<div class="description">${pref.description}</div>`
			}

			if (! pref.url) {pref.url = ""}
			if (! pref.port) {pref.port = ""}
			if (! pref.prefix) {pref.prefix = ""}
			if (! pref.suffix) {pref.suffix = ""}
			if (! prefs.hideurls) {
				if (! prefs.pages[i].hideurls) {
					if (! pref.hideurl) {
						if (pref.port != "") {
							link.innerHTML += `<div class="url">on port ${pref.port}</div>`
						} else if (pref.url != "") {
							link.innerHTML += `<div class="url">${pref.url}</div>`
						}
					}
				}
			}

			if (pref.port != "") {
				link.setAttribute("onclick", `location.href = "${pref.prefix}${location.protocol}//${window.location.hostname}:${pref.port}${pref.suffix}"`);
			} else if (pref.url != "") {
				link.setAttribute("onclick", `location.href = "${pref.prefix}${pref.url}${pref.suffix}"`);
			}
		}
	}
}; load()
