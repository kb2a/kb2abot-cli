const {execShellCommand, greenLog, redLog} = require('../helper.js');

module.exports = {
	keywords: ['clone', 'c'],
	params: [],
	description: 'Clone kb2abot phien ban moi nhat ve duong dan ~/kb2abot',
	fn: async () => {
		try {
			console.log('Dang tai phien ban moi nhat cua kb2abot ve may . . .');
			await execShellCommand('git clone https://github.com/kb2abot/kb2abot/');
		} catch (e) {
			redLog('Da gap loi trong luc tai kb2abot');
			throw e.message;
		}
		greenLog('Da tai kb2abot ve thanh cong!');
	}
};
