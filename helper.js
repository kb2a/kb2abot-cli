import fs from "fs"
import fetch from "node-fetch"

export function subname(text) {
	return text
		.split(".")
		.slice(0, -1)
		.join(".")
}

export async function downloadFile(url, path) {
	const res = await fetch(url)
	const fileStream = fs.createWriteStream(path)
	await new Promise((resolve, reject) => {
		res.body.pipe(fileStream)
		res.body.on("error", reject)
		fileStream.on("finish", resolve)
	})
}
