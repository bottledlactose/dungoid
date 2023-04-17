const { SlashCommandBuilder } = require('discord.js');
const embed = require('../embed');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('create')
		.setDescription('Create a new alias or character')
    .addStringOption(option =>
      option
        .setName('name')
        .setDescription('What is the display name of your alias or character?')
        .setRequired(true)
        .setMinLength(2)
        .setMaxLength(32))
    .addStringOption(option =>
      option
        .setName('prefix')
        .setDescription('What is the chat prefix for your character?')
        .setRequired(true)
        .setMaxLength(6))
    .addAttachmentOption(option =>
        option
          .setName('avatar')
          .setDescription('What does your character look like?')
          .setRequired(true)),
	async execute(interaction, client) {
    const name = interaction.options.getString('name');
    const prefix = interaction.options.getString('prefix');
    const avatar = interaction.options.getAttachment('avatar');

    const response = embed.default(client)
      .setDescription(`You can now use your character by typing \`${prefix}Hello, world!\``);

    await interaction.reply({ embeds: [response] });
	},
};
