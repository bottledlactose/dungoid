const { SlashCommandBuilder } = require('discord.js');
const embedModule = require('../modules/embed');
const characterModule = require('../modules/character');

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

    let characters = await characterModule.get(interaction.user);

    for (const c of characters) {
      if (c.prefix === prefix) {
        const embed = embedModule.error(client)
          .setDescription(`The prefix \`${prefix}\` is already in use by another character!`);

        await interaction.reply({ embeds: [embed], ephemeral: true });
        return;
      }
    }

    await characterModule.set(interaction.user, [...characters, {
      name: name,
      prefix: prefix,
      avatarURL: avatar.url,
    }]);

    const embed = embedModule.success(client)
      .setDescription(`You can now use your character by using \`/say ${prefix} Hello, world!\``);

    await interaction.reply({ embeds: [embed], ephemeral: true });
	},
};
