const { SlashCommandBuilder } = require('discord.js');
const { infoEmbed } = require('../modules/embed');
const { supportURL } = require('../config.json');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('support')
		.setDescription('Receive a permanent invite link to my support channel'),
	async execute(interaction, client) {

    const embed = infoEmbed(client)
      .setTitle(`Need help?`)
      .setDescription(`Need some help or do you want to report a bug or make a suggestion? Use [this link](https://discord.gg/${supportURL}) to join the ${client.user.username} support server!`);

		await interaction.reply({ embeds: [embed] });
	},
};
