const Events = require('../structures/Events');
const Config = require('../config/Config');
const SlashEvents = require('../utils/SlashEvents');
const { Client } = require('discord.js');

module.exports = class Ready extends Events {

	/**
	 *
	 * @param {Client} client
	 */
	constructor(client) {
		super(client);
		this.client = client;

		this.name = 'ready';
	}

	async run() {
		this.client.config = Config;

		this.client.slash = new SlashEvents(this.client);
		await this.client.slash.verifyCommands();
	}

};
