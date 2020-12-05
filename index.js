const fs = require("fs");
const ejs = require("ejs");
const path = require("path");
const pkgDir = require("pkg-dir");
const minimist = require("minimist");
const childProcess = require("child_process");

const args = process.argv.slice(2);
const argv = minimist(args);
const method = args[0].trim();

const createPlugin = async () => {
	const utilDir = path.join(global.prjDir, "main", "utils");
	const pluginDir = path.join(global.prjDir, "main", "plugins");
	const name = args[1].trim();

	if (fs.existsSync(pluginDir) && fs.existsSync(utilDir)) {
		const content = ejs.render(
			fs.readFileSync(global.prjDir + "/main/templates/plugin.ejs").toString(),
			{
				name,
				hasUtil: argv["with-util"]
			}
		);
		const newPlg = path.join(global.prjDir, "main/plugins", name + ".js");
		fs.writeFileSync(newPlg, content);
		console.log(`Da tao 1 file plugin ten ${name}.js tai duong dan:`);
		console.log(newPlg);
		if (argv["with-util"]) {
			const content = ejs.render(
				fs.readFileSync(global.prjDir + "/main/templates/util.ejs").toString(),
				{
					name
				}
			);
			const newUtil = path.join(global.prjDir, "main/utils", name + ".js");
			fs.writeFileSync(newUtil, content);
			console.log(`Da tao 1 file util ten ${name}.js tai duong dan:`);
			console.log(newUtil);
		}
	} else {
		console.log("Thieu thu muc utils va plugins, vui long cai lai kb2abot!");
	}
};

const execShellCommand = cmd => {
	return new Promise(resolve => {
		childProcess.exec(cmd, (error, stdout, stderr) => {
			if (error) {
				console.warn(error);
				resolve();
			}
			resolve(stdout ? stdout : stderr);
		});
	});
};

const newKb2abot = async () => {
	try {
		console.log("Dang tai phien ban moi nhat cua kb2abot ve may . . .");
		await execShellCommand("git clone https://github.com/KhoaKoMlem/kb2abot/.");
	} catch (e) {
		console.log(e.message);
		console.log("Da gap loi trong luc tai kb2abot");
	}
	console.log("Da tai kb2abot ve thanh cong!");
};

(async () => {
	global.prjDir = await pkgDir(process.cwd());
	switch (method) {
		case "create-plugin":
			await createPlugin();
			break;
		case "new":
			await newKb2abot();
			break;
	}
})();
