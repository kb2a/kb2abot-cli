const fs = require('fs');
const ejs = require('ejs');
const path = require('path');
const template = require('../templates');

module.exports = {
	keywords: ['rebase', 'rb'],
	params: [],
	description: 'Comment code plugin hiện tại init lại cấu trục plugin (CHỈ DÀNH CHO NHÀ PHÁT TRIỂN)',
	fn: async argv => {
		const pluginDir = path.join(global.kb2abotDir, 'main', 'plugins');
		if (!argv._[1])
			throw 'Ban chua nhap ten plugin! \n kb2abot-cli re-structure <ten plugin>';
		const name = argv._[1].trim();
		if (fs.existsSync(pluginDir)) {
			const plgPath = `${pluginDir}/${name}.js`;
			const currentContent = fs.readFileSync(plgPath);
			const newContent = ejs.render(template.plugin, {name, ...argv});
			fs.writeFileSync(plgPath, `${newContent}\n\n/*\n${currentContent}\n*/`, );
		} else {
			throw 'Khong tim thay thu muc "utils" hoac "plugins", vui long mount den' +
						' kb2abot, hoac ban co the cai lai bang lenh kb2abot-cli clone!';
		}
	}
};
