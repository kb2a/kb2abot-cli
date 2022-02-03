import fs from "fs"
import path from "path"
import {success} from "kb2abot/util/logger.js"
import {Command} from "../templates/index.js"
import cli from "../global.js"

cli.command(
	"remake <file-name>",
	"Comment current command code and insert new one",
	yargs => {
		yargs.positional("file-name", {
			describe: "path/to/file",
			type: "string"
		})
	},
	argv => {
		const name = argv.fileName
		const resolveName = fs.existsSync(path.resolve(process.cwd(), name))
			? name
			: name + ".js"
		const cmdPath = path.join(process.cwd(), resolveName)
		const currentContent = fs.existsSync(cmdPath)
			? fs.readFileSync(cmdPath).toString()
			: "(New file)"
		fs.writeFileSync(
			cmdPath,
			`${Command(name, argv)}\n\n/*\n${currentContent}\n*/`
		)
		success(`Remade command ${path.basename(cmdPath)}.js at ${cmdPath}`)
	}
)
