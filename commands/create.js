const { SlashCommandBuilder } = require('discord.js');
const embedHelper = require('../modules/embed-helper');

const { QuickDB } = require('quick.db');
const db = new QuickDB();

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

    const userId = interaction.user.id;
    let characters = await db.get(`characters_${userId}`) || [];

    for (const character of characters) {
      if (character.prefix === prefix) {
        const embed = embedHelper.error(client)
          .setDescription(`The prefix \`${prefix}\` is already in use by another character!`);

        await interaction.reply({ embeds: [embed], ephemeral: true });
        return;
      }
    }

    await db.set(`characters_${userId}`, [...characters, {
      name: name,
      prefix: prefix,
      avatarUrl: avatar.url
    }]);

    const embed = embedHelper.success(client)
      .setDescription(`You can now use your character by using \`/say ${prefix} Hello, world!\``);

    await interaction.reply({ embeds: [embed], ephemeral: true });
	},
};
