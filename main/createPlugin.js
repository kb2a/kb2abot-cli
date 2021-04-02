const fs = require('fs');
const ejs = require('ejs');
const path = require('path');
const template = require('../templates');
const {greenLog} = require('../helper.js');

module.exports = {
	keywords: ['create-plugin'],
	params: [],
	description: 'Tao 1 folder plugin',
	fn: async (argv) => {
		const pluginsDir = path.join(global.kb2abotDir, 'main/deploy/plugins');
		if (!argv._[1])
			throw 'Ban chua nhap ten plugin! \n kb2abot-cli create-plugin <ten plugin>';
		const name = argv._[1].trim();

		if (fs.existsSync(pluginsDir)) {
			const plgDir = path.join(pluginsDir, name);
			if (fs.existsSync(plgDir)) {
				throw `Da co folder ten "${name}", vui long chon ten khac!`;
			}
			fs.mkdirSync(plgDir);
			fs.writeFileSync(path.join(plgDir, 'index.js'), ejs.render(template.command, {name, ...argv}));
			fs.writeFileSync(path.join(plgDir, 'manifest.json'), ejs.render(template.manifest, {name, ...argv}));

			greenLog(`Da tao 1 folder plugin ten ${name} tai duong dan:`);
			console.log(plgDir);
		} else {
			throw 'Khong tim thay thu muc "plugins", vui long mount den' +
						' kb2abot, hoac ban co the cai lai bang lenh kb2abot-cli clone!';
		}
	}
};
