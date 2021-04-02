const fs = require('fs');
const ejs = require('ejs');
const path = require('path');
const template = require('../templates');
const {subname} = require('../helper.js');

module.exports = {
	keywords: ['rebase', 'rb'],
	params: [],
	description: 'Comment code command hien tai roi init lai cau truc command (FOR DEV ONLY)',
	fn: async argv => {
		if (!argv._[1])
			throw 'Ban chua nhap dia chi file command! \n kb2abot-cli rebase <dia chi file command>';
		const cpath = path.resolve(process.cwd(), argv._[1].trim());
		console.log(cpath);
		// return;
		const currentContent = fs.readFileSync(cpath);
		const newContent = ejs.render(template.command, {name: subname(path.basename(cpath)), ...argv});
		fs.writeFileSync(cpath, `${newContent}\n\n/*\n${currentContent}\n*/`, );
	}
};
