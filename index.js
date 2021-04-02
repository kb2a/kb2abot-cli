#!/usr/bin/env node
global.main = require('./main');

const pkgDir = require('pkg-dir');
const minimist = require('minimist');
const {redLog} = require('./helper.js');
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
					if (param == '_') continue;
					if (params.includes(param)) {
						await fn(argv);
						notFound = false;
					}
				}
			}
		}
		catch (message) {
			redLog(`Error: ${message}`);
			console.log(message);
			process.exit();
		}
	}
	if (notFound) {
		global.main.help.fn();
	}
})();
