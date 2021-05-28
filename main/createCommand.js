const fs = require('fs');
const ejs = require('ejs');
const path = require('path');
const template = require('../templates');
const {greenLog} = require('../helper.js');

module.exports = {
	keywords: ['create-command'],
	params: [],
	description: 'Tao 1 file command',
	fn: async argv => {
		if (!argv._[1])
			throw 'Ban chua nhap ten cau lenh!\n kb2abot-cli create-command <ten lenh>';
		const name = argv._[1].trim();
		const cmdPath = path.join(process.cwd(), name + '.js');
		if (fs.existsSync(cmdPath)) {
			throw `Da co file ten "${name}.js", vui long chon ten khac!`;
		}
		fs.writeFileSync(cmdPath, ejs.render(template.command, {name, ...argv}));
		greenLog(`Da tao 1 file command ten ${name}.js tai duong dan:`);
		console.log(cmdPath);
	}
};
