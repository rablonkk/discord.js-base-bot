const { GatewayIntentBits, Partials } = require('discord.js');

module.exports = {
	intents: [
		GatewayIntentBits.DirectMessages,
		GatewayIntentBits.Guilds,
	],
	partials: [
		Partials.Channel,
		Partials.Message,
	],
};