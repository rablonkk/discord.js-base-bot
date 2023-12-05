const { EmbedBuilder } = require('discord.js');

const Commands = require('../../structures/Commands');

class Ping extends Commands {

	/**
	 *
	 * @param {import('discord.js').Client} client
	 */
	constructor(client) {
		super(client);
		this.client = client;

		this.name = 'ping';
		this.description = 'Check ping the bot';

		this.options = [];

		this.category = 'utility';

		this.enabled = true;
		this.ignoreSlash = false;
	}

	/**
	 *
	 * @param {import('discord.js').CommandInteraction} interaction
	 * @returns
	 */
	run(interaction) {
		const pingEmbed = new EmbedBuilder()
			.setDescription(`📡 API latency: \`${Math.round(interaction.client.ws.ping)}ms\`\n🏓 Response time: \`${Date.now() - interaction.createdTimestamp}ms\``)
			.setColor(interaction.guild.members.me.displayHexColor || 'Default');

		interaction.reply({
			embeds: [pingEmbed],
			ephemeral: true,
		});
	}

}

module.exports = Ping;