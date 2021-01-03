const fs = require('fs');
const ejs = require('ejs');
const path = require('path');
const template = require('../templates');
const {greenLog} = require('../helper.js');

module.exports = {
	keywords: ['create-plugin'],
	params: [],
	description: 'Tao 1 plugin (co the kem util)',
	fn: async (argv) => {
		const utilDir = path.join(global.kb2abotDir, 'main', 'utils');
		const pluginDir = path.join(global.kb2abotDir, 'main', 'plugins');
		if (!argv._[1])
			throw 'Ban chua nhap ten plugin! \n kb2abot-cli create-plugin <ten plugin>';
		const name = argv._[1].trim();

		if (fs.existsSync(pluginDir) && fs.existsSync(utilDir)) {
			const content = ejs.render(template.plugin, {name, hasUtil: argv['with-util']});
			const newPlg = path.join(global.kb2abotDir, 'main/plugins', name + '.js');
			fs.writeFileSync(newPlg, content);
			greenLog(`Da tao 1 file plugin ten ${name}.js tai duong dan:`);
			console.log(newPlg);
			if (argv['with-util']) {
				const content = ejs.render(template.util, {name});
				const newUtil = path.join(global.kb2abotDir, 'main/utils', name + '.js');
				fs.writeFileSync(newUtil, content);
				greenLog(`Da tao 1 file util ten ${name}.js tai duong dan:`);
				console.log(newUtil);
			}
		} else {
			throw 'Khong tim thay thu muc "utils" hoac "plugins", vui long mount den' +
						' kb2abot, hoac ban co the cai lai bang lenh kb2abot-cli clone!';
		}
	}
};
