const { SlashCommandBuilder, PermissionsBitField } = require('discord.js');
const { logData } = require('../modules/data');
const embedModule = require('../modules/embed');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('log')
		.setDescription('Sets a log channel for moderators')
    .setDefaultMemberPermissions(PermissionsBitField.Flags.Administrator)
    .addChannelOption(option =>
      option.setName('channel')
        .setDescription('The channel to log moderation messages to')
        .setRequired(true)),
	async execute(interaction, client) {
    const channel = interaction.options.getChannel('channel');
    await logData.set(interaction.guild, channel);

    const embed = embedModule.success(client)
      .setTitle('Log channel set!')
      .setDescription(`New moderation messages will now be logged to <#${channel.id}>!`);

		await interaction.reply({ embeds: [embed], ephemeral: true });
	},
};
