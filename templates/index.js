import fs from "fs"
import ejs from "ejs"
import {resolve} from "url"
import {userInfo} from "os"

const items = ["command", "package", "plugin"]
const template = {}
for (const name of items) {
	template[name] = String(
		fs.readFileSync(new URL(resolve(import.meta.url, `${name}.ejs`)))
	)
}

export function Command(name, argv) {
	return ejs.render(template.command, { name, clean: false, ...argv })
}

export function Plugin(name, argv) {
	return ejs.render(template.plugin, { name, clean: false, ...argv })
}

export function Package(name, argv) {
	return ejs.render(template.package, { name, username: userInfo().username, ...argv })
}