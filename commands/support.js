const { SlashCommandBuilder } = require('discord.js');
const { infoEmbed } = require('../modules/embed');
const { clientId } = require('../config.json');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('support')
		.setDescription('Receive a link to my listing page to get support or leave a rating'),
	async execute(interaction, client) {

    const embed = infoEmbed(client)
      .setTitle(`Need help or want to leave a rating?`)
      .setDescription(`Do you need some help or do you want to report a bug or make a suggestion? Or would you be so kind to leave a rating on the bot? Please have a look at [${client.user.username}'s listing entry](https://top.gg/bot/${clientId}).`);

		await interaction.reply({ embeds: [embed], ephemeral: true });
	},
};
