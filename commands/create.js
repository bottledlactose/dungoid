const { SlashCommandBuilder } = require('discord.js');
const characterModule = require('../modules/character');
const embedModule = require('../modules/embed');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('create')
		.setDescription('Create a new alias or character')
    .addStringOption(option =>
      option
        .setName('name')
        .setDescription('What is the display name of your character?')
        .setRequired(true)
        .setMinLength(2)
        .setMaxLength(32))
    .addStringOption(option =>
      option
        .setName('prefix')
        .setDescription('What is the identifier prefix for your character?')
        .setRequired(true)
        .setMaxLength(6))
    .addAttachmentOption(option =>
        option
          .setName('avatar')
          .setDescription('What does your character look like?')
          .setRequired(true)),
	async execute(interaction, client, config) {
    const name = interaction.options.getString('name');
    const prefix = interaction.options.getString('prefix');
    const avatar = interaction.options.getAttachment('avatar');

    let characters = await characterModule.get(interaction.user);

    // Make sure the user doesn't exceed the maximum amount of configured character
    if (characters.length + 1 >= config.maxCharacters) {

      const embed = embedModule.error(client)
        .setTitle('Maximum characters reached!')
        .setDescription(`You may have up to ${config.maxCharacters} characters. You can view your characters with \`/list\` and delete some using \`/delete\`.`);

      await interaction.reply({ embeds: [embed], ephemeral: true });
      return;
    }

    // Make sure the user is actually uploading an image
    if (!avatar.contentType.startsWith('image/')) {

      const embed = embedModule.error(client)
        .setTitle('Invalid avatar!')
        .setDescription(`The uploaded avatar attachment must be an image.`);

      await interaction.reply({ embeds: [embed], ephemeral: true });
      return;
    }

    // Let's check if the provided prefix isn't in use yet
    for (const c of characters) {
      if (c.prefix === prefix) {
        const embed = embedModule.error(client)
          .setTitle('Prefix already in use!')
          .setDescription(`The prefix \`${prefix}\` is already in use by another character.`);

        await interaction.reply({ embeds: [embed], ephemeral: true });
        return;
      }
    }

    // Add the newly created character to the user's character dataset
    await characterModule.set(interaction.user, [...characters, {
      name: name,
      prefix: prefix,
      avatarURL: avatar.url,
    }]);

    const embed = embedModule.success(client)
      .setTitle('Character created!')
      .setDescription('You can now use your character by using \`/say\` or view all yours characters using \`/list\`.');

    await interaction.reply({ embeds: [embed], ephemeral: true });
	},
};
