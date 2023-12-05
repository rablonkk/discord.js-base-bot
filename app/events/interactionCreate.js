const { InteractionType, ChannelType, EmbedBuilder } = require('discord.js');

const Events = require('../structures/Events');

class interactionCreate extends Events {
	/**
     *
     * @param {import('discord.js').Client} client
     */
	constructor(client) {
		super(client);
		this.client = client;

		this.name = 'interactionCreate';
	}

	/**
	 *
	 * @param {import('discord.js').CommandInteraction} interaction
	 * @returns
	 */
	async run(interaction) {
		if (interaction.type === InteractionType.ApplicationCommand) {
			if (interaction.isCommand()) {
				const command = this.client.commands.get(interaction.commandName);

				if (command.ignoreSlash) {
					return this.IgnoreSlash(interaction);
				}

				if (!command) {
					return this.unknownCommand(interaction);
				}

				if (!command.enabled) {
					return this.commandDisabled(interaction);
				}

				if (interaction.channel.type === ChannelType.DM) {
					return this.DmCommand(interaction);
				}

				try {
					command.run(interaction);
				}
				catch (error) {
					this.commandError(interaction);
					console.log('[InteractionCreate ERROR] ', error);
				}
			}
		}
	}

	async unknownCommand(interaction) {
		const unknownEmbed = new EmbedBuilder({ color: this.client.config.colors.error })
			.setDescription('❌ Unknown command.');

		return interaction.reply({
			embeds: [unknownEmbed],
			ephemeral: true,
		});
	}

	async commandDisabled(interaction) {
		const disabledEmbed = '❌ This command is temporarily disabled.';

		return interaction.reply({
			embeds: [disabledEmbed],
			ephemeral: true,
		});
	}

	async IgnoreSlash(interaction) {
		const ignoreSlash = '❌ This command is no longer available.';

		return interaction.reply({
			embeds: [ignoreSlash],
			ephemeral: true,
		});
	}

	async DmCommand(interaction) {
		const DmEmbed = '❌ You cannot execute commands in my DM.';

		return interaction.reply({
			embeds: [DmEmbed],
			ephemeral: true,
		});
	}

	async commandError(interaction) {
		const errorEmbed = '❌ An error occurred while executing this command.';

		return interaction.reply({
			content: [errorEmbed],
			ephemeral: true,
		});
	}

}

module.exports = interactionCreate;
