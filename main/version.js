const {version} = require('../package.json');

module.exports = {
	keywords: [],
	params: ['version', 'v'],
	description: 'Kiem tra phien ban cua kb2abot-cli',
	fn: async () => {
		console.log(version);
	}
};
