const {version} = require('../package.json');

module.exports = {
	keywords: [],
	params: ['version', 'v'],
	description: 'Kiểm tra phiên bản của kb2abot-cli',
	fn: async () => {
		console.log(`kb2abot-cli@${version}`);
	}
};
