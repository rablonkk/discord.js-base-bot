const fs = require('fs');
const path = require('path');

const Events = require('../structures/Events');
const Loaders = require('../structures/Loaders');

module.exports = class loadEvents extends Loaders {

	/**
	 *
	 * @param {import('discord.js').Client} client
	 */
	constructor(client) {
		super(client);
		this.client = client;

		this.name = 'loadEvents';
	}

	load() {
		this.loadFolder('../events');
	}

	loadFolder(directory) {
		const filePath = path.join(__dirname, directory);
		const files = fs.readdirSync(filePath, { withFileTypes: true });

		for (const file of files) {
			if (file.isDirectory()) {
				this.loadFolder(path.join(directory, file.name));
			}
			else {
				const Event = require(path.join(filePath, file.name));

				if (Event.prototype instanceof Events) {
					this.listenEvent(Event);
				}
			}
		}
	}

	async listenEvent(Event) {
		const event = new Event(this.client);

		await this.client.on(event.name, (...args) => event.run(...args));
	}

};
