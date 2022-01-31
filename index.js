#!/usr/bin/env node
import glob from "glob"
import url from "url"

for (const file of glob.sync(url.fileURLToPath(new URL(url.resolve(import.meta.url, "commands/*.js")))))
	await import(new URL(url.resolve(import.meta.url, file)))
import cli from "./global.js"

cli.demandCommand(1).parse()

// const amo = yargs(hideBin(process.argv))
// 	.command("curl <url>", "fetch the contents of the URL", () => {}, (argv) => {
// 		console.info(argv)
// 	})

/*
global.main = require("./main");

const pkgDir = require("pkg-dir");
const minimist = require("minimist");
const {redLog} = require("./helper.js");
const argv = minimist(process.argv.slice(2));

(async () => {
	global.kb2abotDir = await pkgDir(process.cwd());
	let notFound = true;
	for (const name in global.main) {
		const {keywords, params, fn} = global.main[name];
		const method = argv._[0];
		try {
			if (keywords.includes(method)) {
				await fn(argv);
				notFound = false;
			} else {
				for (const param in argv) {
					if (param == "_") continue;
					if (params.includes(param)) {
						await fn(argv);
						notFound = false;
					}
				}
			}
		} catch (message) {
			redLog(`Error: ${message}`);
			console.log(message);
			process.exit();
		}
	}
	if (notFound) {
		global.main.help.fn();
	}
})();

const subname = text => {
	return text
		.split('.')
		.slice(0, -1)
		.join('.');
};
*/