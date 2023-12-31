const fs = require('fs');
const path = require('path');

const Commands = require('../structures/Commands');
const Loaders = require('../structures/Loaders');

module.exports = class loadCommands extends Loaders {

	/**
	 *
	 * @param {import('discord.js').Client} client
	 */
	constructor(client) {
		super(client);
		this.client = client;

		this.name = 'loadCommands';
	}

	load() {
		this.client.commands = new Map();

		this.loadFolder('../commands');
	}

	loadFolder(directory) {
		const filePath = path.join(__dirname, directory);
		const files = fs.readdirSync(filePath, { withFileTypes: true });

		for (const file of files) {
			if (file.isDirectory()) {
				this.loadFolder(path.join(directory, file.name));
			}
			else {
				const Command = require(path.join(filePath, file.name));

				if (Command.prototype instanceof Commands) {
					this.registerCommand(Command);
				}
			}
		}
	}

	async registerCommand(Command) {
		const command = new Command(this.client);

		await this.client.commands.set(command.name, command);
	}

};
