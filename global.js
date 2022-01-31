import yargs from "yargs"
import { hideBin } from "yargs/helpers"

export default yargs(hideBin(process.argv))
	.option("clean", {
		alias: "c",
		default: false,
		describe: "Create plugin/command without comment",
		type: "boolean"
	})