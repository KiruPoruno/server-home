async function load() {
	let pages = await (await fetch("pages.json")).json();
	try {
		pages = await (await fetch("custom-pages.json")).json();
	}catch(err) {}
}; load()
