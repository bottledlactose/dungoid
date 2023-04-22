const { SlashCommandBuilder, PermissionsBitField } = require('discord.js');
const { logData } = require('../modules/data');
const { successEmbed } = require('../modules/embed');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('log')
		.setDescription('Set up a message log channel')
    .setDefaultMemberPermissions(PermissionsBitField.Flags.Administrator)
    .addChannelOption(option =>
      option.setName('channel')
        .setDescription('To which channel would you like to log messages?')
        .setRequired(true)),
	async execute(interaction, client) {
    const channel = interaction.options.getChannel('channel');
    await logData.set(interaction.guild, channel);

    const embed = successEmbed(client, {
      title: 'Log channel set!',
      description: `New log messages will now be logged to <#${channel.id}>!`,
    });

		await interaction.reply({ embeds: [embed] });
	},
};
