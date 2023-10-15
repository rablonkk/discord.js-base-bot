const Events = require('../structures/Events');
const Config = require('../config/Config');
const SlashEvents = require('../utils/SlashEvents');

class Ready extends Events {
	/**
	 *
	 * @param {import('discord.js').Client} client
	 */
	constructor(client) {
		super(client);
		this.client = client;

		this.name = 'ready';
	}

	async run() {
		this.client.on('error', (err) => {
			console.log('[Client ERROR] ', err);
		});

		process.on('unhandledRejection', (reason) => {
			console.log('[ERROR] ', reason);
		});

		this.client.config = Config;

		this.client.slash = new SlashEvents(this.client);
		await this.client.slash.verifyCommands();
	}

}

module.exports = Ready;
