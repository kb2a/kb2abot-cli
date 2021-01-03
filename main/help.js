const {greenLog} = require('../helper.js');

module.exports = {
	keywords: ['help'],
	params: [],
	description: 'Hien thi danh sach lenh',
	fn: async () => {
		let index = 0;
		for (const name in global.main) {
			const {keywords, params, description} = global.main[name];
			if (keywords.length > 0)
				greenLog(`${++index}. ${keywords.join(' | ')}`);
			else {
				let joinParams = '';
				for (const param of params) {
					if (param.length > 1)
						joinParams += 'kb2abot-cli --';
					else
						joinParams += 'kb2abot-cli -';
					joinParams += param;
					if (params.indexOf(param) < params.length-1)
						joinParams += ' | ';
				}
				greenLog(`${++index}. ${joinParams}`);
			}

			console.log(' --> ' + description);
		}
	}
};
