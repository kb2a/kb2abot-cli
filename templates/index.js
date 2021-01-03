const fs = require('fs');
const templates = ['plugin', 'util'];

for (const template of templates) {
	module.exports[template] = String(
		fs.readFileSync(__dirname + `/${template}.ejs`)
	);
}
