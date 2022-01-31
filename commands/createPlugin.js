import fs from "fs"
import path from "path"
import { success } from "kb2abot/util/logger.js"
import {Plugin, Command, Package} from "../templates/index.js"
import cli from "../global.js"

cli
	.command("plugin <plugin-name>", "Create folder plugin including example command", yargs => {
		yargs.positional("plugin-name", {
			describe: "plugin name",
			type: "string"
		})
		yargs.check(argv => {
			const name = argv.pluginName
			const plgDir = path.join(process.cwd(), name)
			if (fs.existsSync(plgDir))
				throw `Dupplicated folder name: "${name}", please choose another!`
			return true
		})
	}, argv => {
		const name = argv.pluginName
		const plgDir = path.join(process.cwd(), name)
		fs.mkdirSync(path.join(plgDir, "src", "commands"), {recursive: true})
		fs.writeFileSync(
			path.join(plgDir, "src", "index.js"),
			Plugin(name, argv)
		)
		fs.writeFileSync(
			path.join(plgDir, "src", "commands", "example.js"),
			Command("example", argv)
		)
		fs.writeFileSync(
			path.join(plgDir, "package.json"),
			Package(name, argv)
		)
		success(`Create folder plugin ${name} at ${plgDir}`)
	})