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
			throw 'Ban chua nhap ten plugin! \n kb2abot-cli create-plugin <ten plugin> [--util]';
		const name = argv._[1].trim();

		if (fs.existsSync(pluginDir) && fs.existsSync(utilDir)) {
			const content = ejs.render(template.plugin, {name, ...argv});
			const plgPath = path.join(global.kb2abotDir, 'main/plugins', name + '.js');
			if (fs.existsSync(plgPath)) {
				throw `Plugin ten ${name} da duoc su dung, vui long chon ten khac!`;
			}
			fs.writeFileSync(plgPath, content);
			greenLog(`Da tao 1 file plugin ten ${name}.js tai duong dan:`);
			console.log(plgPath);
			if (argv['util']) {
				const content = ejs.render(template.util, {name});
				const utilPath = path.join(global.kb2abotDir, 'main/utils', name + '.js');
				if (fs.existsSync(utilPath)) {
					throw `Util ten ${name} da duoc su dung, huy bo tao util ${name.js}!`;
				}
				fs.writeFileSync(utilPath, content);
				greenLog(`Da tao 1 file util ten ${name}.js tai duong dan:`);
				console.log(utilPath);
			}
		} else {
			throw 'Khong tim thay thu muc "utils" hoac "plugins", vui long mount den' +
						' kb2abot, hoac ban co the cai lai bang lenh kb2abot-cli clone!';
		}
	}
};
