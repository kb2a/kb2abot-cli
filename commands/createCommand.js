import fs from "fs"
import path from "path"
import {Command} from "../templates/index.js"
import cli from "../global.js"
import {success} from "kb2abot/util/logger.js"

cli.command(
	"command <command-name>",
	"Create a command file template",
	yargs => {
		yargs.positional("command-name", {
			describe: "path/to/file",
			type: "string"
		})
		yargs.check(argv => {
			const name = argv.commandName
			const cmdPath = path.join(process.cwd(), name + ".js")
			if (fs.existsSync(cmdPath))
				throw `Dupplicated file name: "${name}.js", please choose another!`
			return true
		})
	},
	argv => {
		const name = argv.commandName
		const cmdPath = path.join(process.cwd(), name + ".js")
		fs.writeFileSync(cmdPath, Command(name, argv))
		success(`Created command ${name}.js at ${cmdPath}`)
	}
)
