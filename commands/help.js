const { SlashCommandBuilder } = require('discord.js');
const { infoEmbed } = require('../modules/embed');
const { clientId } = require('../config.json');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('help')
		.setDescription('Learn my commands and receive information about basic commands'),
	async execute(interaction, client) {

    const embed = infoEmbed(client)
      .setTitle(`About ${client.user.username}`)
      .setDescription(`**${client.user.username}** is a simple application to enhance your `
        + `role-playing experience through the use of a **full alias/character system** and `
        + `an **advanced dice system**. Please consider [rating the bot](https://top.gg/bot/${clientId}#reviews) if you like it!`
        + `\n\nHere are some commands to get you started:`)
      .addFields([
        { name: '\`/support\`', value: 'Receive a link to the support server' },
        { name: '\`/create\`', value: 'Create a new character' },
        { name: '\`/delete\`', value: 'Delete an existing character' },
        { name: '\`/update\`', value: 'Update an existing character\'s avatar' },
        { name: '\`/list\`', value: 'View your character list' },
        { name: '\`/say\`', value: 'Send your message as one of your characters' },
        { name: '\`/roll\`', value: 'Roll a virtual dice with the given amount of sides' },
        { name: '\`/log\`', value: 'Set up a log channel to post all character messages to (Requires \`Administrator\`!)' },
      ]);

		await interaction.reply({ embeds: [embed], ephemeral: true });
	},
};
