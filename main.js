async function load() {
	let prefs = await (await fetch("settings.json")).json();
	try {
		prefs = await (await fetch("custom-settings.json")).json();
	}catch(err) {}

	document.title = prefs.title;

	for (let i = 0; i < prefs.pages.length; i++) {
		main.innerHTML += `<div class="header">${prefs.pages[i].title}</div>`
		for (let ii = 0; ii < prefs.pages[i].links.length; ii++) {
			main.innerHTML += `<div class="links"><div class="link link${i + '' + ii}">${prefs.pages[i].links[ii].name}</div></div>`;
			let link = document.querySelector(".link" + i + '' + ii);
			link.setAttribute("onclick", `location.href = "${location.protocol}//${window.location.hostname}:${prefs.pages[i].links[ii].port}"`);

			if (! prefs.hideurls) {
				if (! prefs.pages[i].hideurls) {
					if (! prefs.pages[i].links[ii].hideurl) {
						if (prefs.pages[i].links[ii].port != "") {
							link.innerHTML += `<div class="url">on port ${prefs.pages[i].links[ii].port}</div>`
						} else if (prefs.pages[i].links[ii].url != "") {
							link.innerHTML += `<div class="url">${prefs.pages[i].links[ii].url}</div>`
						}
					}
				}
			}
		}
	}
}; load()
