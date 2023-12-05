const { WebhookClient, EmbedBuilder } = require('discord.js');
const Events = require('../structures/Events');
const { inspect } = require('util');

class Error extends Events {

	/**
	 *
	 * @param {import('discord.js').Client} client
	 */
	constructor(client) {
		super(client);
		this.client = client;

		this.name = 'error';
	}

	async run() {
		const webhook = new WebhookClient({ url: process.env.WEBHOOK });

		this.client.on('error', (err) => {
			console.log('❌ [ClientERROR]', err);

			const errorEmbed = new EmbedBuilder()
				.setDescription(`\`\`\`${inspect(err, { depth: 0 }).substr(0, 2045)}...\`\`\``)
				.setColor('Red');

			return webhook.send({ embeds: errorEmbed });
		});

		process.on('unhandledRejection', async (err) => {
			console.log('❌ [UnhandledRejection]', err);

			const unhandledRejectionEmbed = new EmbedBuilder()
				.setDescription(`\`\`\`${inspect(err, { depth: 0 }).substr(0, 2045)}...\`\`\``)
				.setColor('Red');

			return webhook.send({ embeds: unhandledRejectionEmbed });
		});
	}

}

module.exports = Error;
