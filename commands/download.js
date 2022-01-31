import fs from "fs"
import path from "path"
import fetch from "node-fetch"
import extract from "extract-zip"
import { success, error } from "kb2abot/util/logger.js"
import { downloadFile } from "../helper.js"
import cli from "../global.js"

cli.command("download [release-version]", "Download the specific release version of kb2abot-client & kb2abot-dedicated-server", yargs => {
	yargs.positional("release-version", {
		describe: "Specific release version to download",
		default: "latest"
	})
}, async argv => {
	const ver = argv.releaseVersion
	const releases = await json("https://api.github.com/repos/kb2ateam/kb2abot/tags")
	const index = ver != "latest" ? releases.findIndex(rl => rl.name == ver) : 0

	if (index == -1 || releases.length == 0)
		return error("Release not found!")

	const { name, zipball_url, commit } = releases[index]
	const source = path.join(process.cwd(), `kb2abot-client@${name}.zip`)
	const dest = path.join(process.cwd(), `kb2abot-client@${name}`)

	console.log(`Downloading kb2abot-client@${name} . . .`)
	await downloadFile(zipball_url, source)
	console.log(`Extracting kb2abot-client@${name}.zip . . .`)
	await extract(source, {dir: process.cwd()})
	fs.unlinkSync(source)
	fs.renameSync(path.join(process.cwd(), `kb2ateam-kb2abot-${commit.sha.slice(0, 7)}`), dest)
	success(`Done kb2abot-client@${name}!`)
})

async function json(url) {
	return await (await fetch(url)).json()
}