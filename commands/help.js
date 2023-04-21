const { SlashCommandBuilder } = require('discord.js');
const { infoEmbed } = require('../modules/embed');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('help')
		.setDescription('Learn my commands and receive information about basic commands'),
	async execute(interaction, client) {

    const embed = infoEmbed(client)
      .setTitle(`About ${client.user.username}`)
      .setDescription(`**${client.user.username}** is a simple application to enhance your `
        + `role-playing experience through the use of a **full alias/character system** and `
        + `an **advanced dice system**.`
        + `\n\nHere are some commands to get you started:`)
      .addFields([
        { name: '\`/create\`', value: 'Create a new character' },
        { name: '\`/list\`', value: 'View your character list' },
        { name: '\`/say\`', value: 'Send your message as one of your characters' },
        { name: '\`/roll\`', value: 'Roll a virtual dice with the given amount of sides' },
      ]);

		await interaction.reply({ embeds: [embed], ephemeral: true });
	},
};
