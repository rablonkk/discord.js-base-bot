const { Client } = require('discord.js');
const fs = require('fs');
const path = require('path');
require('dotenv').config({ path: '.env' });

const Loaders = require('./structures/Loaders');

const client = new Client(require('./components/client/Intents'));

function startStructures(directory) {
	const filePath = path.join(__dirname, directory);
	const files = fs.readdirSync(filePath, { withFileTypes: true });

	for (const file of files) {
		if (file.isDirectory()) {
			startStructures(path.join(directory, file.name));
		}
		else {
			const Loader = require(path.join(filePath, file.name));

			if (Loader.prototype instanceof Loaders) {
				const loader = new Loader(client);

				loader.load();
			}
		}
	}
}

(async () => {
	startStructures('./loaders');
	client.login(process.env.TOKEN);
})();