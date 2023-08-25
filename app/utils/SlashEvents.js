module.exports = class SlashEvents {

	constructor(client) {
		this.client = client;
	}

	async verifyCommands() {
		const applicationCommands = await this.client.application.commands.fetch();

		for (const localCommand of this.client.commands.values()) {
			if (localCommand.ignoreSlash) continue;

			const command = {
				name: localCommand.name,
				description: localCommand.description,
				options: localCommand.options,
			};

			const discordCommand = applicationCommands.find(c => c.name === command.name);

			if (!discordCommand) {
				this.client.application.commands.create(command);
				console.log(`[Slash Command] Created /${command.name}`);
				continue;
			}

			const commandIntegrity = this.compareCommands(discordCommand, command);

			if (!commandIntegrity) {
				this.client.application.commands.create(command);
				console.log(`[Slash Command] Updated /${command.name}`);
				continue;
			}
		}

		for (const discordCommand of applicationCommands) {
			const originalCommand = this.client.commands.has(discordCommand[1].name);

			if (!originalCommand) {
				this.client.application.commands.delete(discordCommand[0]);
				console.log(`[Slash Command] Deleted /${discordCommand[1].name}`);
			}
		}
	}

	compareCommands(discordCommand, originalCommand) {
		if (discordCommand.name !== originalCommand.name) return false;

		if (discordCommand.description !== originalCommand.description) return false;

		if (!originalCommand.options) {
			originalCommand.options = [];
		}

		if (discordCommand.options.length !== originalCommand.options.length) return false;

		const optionsIntegrity = this.compareOptions(discordCommand.options, originalCommand.options);
		return optionsIntegrity;
	}

	compareOptions(discordOptions, originalOptions) {
		for (const option of originalOptions) {
			const discordOption = discordOptions.find(o => o.name === option.name);

			if (!discordOption) return false;

			if (discordOption.name !== option.name) return false;

			if (discordOption.description !== option.description) return false;

			if (option.type && discordOption.type !== option.type) return false;

			if (option.required && discordOption.required !== option.required) return false;

			if (!discordOption.choices) {
				discordOption.choices = [];
			}

			if (!option.choices) {
				option.choices = [];
			}

			if (discordOption.choices.length !== option.choices.length) return false;

			for (const choice of option.choices) {
				const discordChoice = discordOption.choices.find(c => c.name === choice.name);
				if (!discordChoice) return false;

				if (discordChoice.name !== choice.name) return false;

				if (discordChoice.value !== choice.value) return false;
			}

			if (!discordOption.options) {
				discordOption.options = [];
			}

			if (!option.options) {
				option.options = [];
			}

			if (discordOption.options.length !== option.options.length) return false;

			const optionIntegrity = this.compareOptions(discordOption.options, option.options);

			if (!optionIntegrity) return false;
		}
	}

};
