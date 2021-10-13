async function load() {
	let prefs = await (await fetch("settings.json")).json();

	document.title = prefs.title;

	for (let i = 0; i < prefs.pages.length; i++) {
		main.innerHTML += `<div class="header">${prefs.pages[i].title}</div>`
		for (let ii = 0; ii < prefs.pages[i].links.length; ii++) {
			let pref = prefs.pages[i].links[ii];

			main.innerHTML += `<div class="links"><div class="link link${i + '' + ii}">${pref.name}</div></div>`;
			let link = document.querySelector(".link" + i + '' + ii);

			if (! pref.prefix) {pref.prefix = ""}
			if (! pref.suffix) {pref.suffix = ""}
			if (! prefs.hideurls) {
				if (! prefs.pages[i].hideurls) {
					if (! pref.hideurl) {
						if (pref.port != "") {
							link.innerHTML += `<div class="url">on port ${pref.port}</div>`
							link.setAttribute("onclick", `location.href = "${pref.prefix}${location.protocol}//${window.location.hostname}:${pref.port}${pref.suffix}"`);
						} else if (pref.url != "") {
							link.innerHTML += `<div class="url">${pref.url}</div>`
							link.setAttribute("onclick", `location.href = "${pref.prefix}${pref.url}${pref.suffix}"`);
						}
					}
				}
			}
		}
	}
}; load()
