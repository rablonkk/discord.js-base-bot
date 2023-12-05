const { ActivityType } = require('discord.js');
const Events = require('../structures/Events');
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
		this.client.user.setActivity({
			name: 'github.com/rablonkk',
			type: ActivityType.Playing,
		});

		this.client.slash = new SlashEvents(this.client);
		await this.client.slash.verifyCommands();
	}

}

module.exports = Ready;
