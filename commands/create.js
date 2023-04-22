const { SlashCommandBuilder } = require('discord.js');
const { charactersData } = require('../modules/data');
const { errorEmbed, successEmbed } = require('../modules/embed');
const { maxCharacters } = require('../config.json');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('create')
		.setDescription('Create a new alias or character')
    .addStringOption(option =>
      option
        .setName('tag')
        .setDescription('What is the unique tag for your character?')
        .setRequired(true)
        .setMaxLength(6))
    .addStringOption(option =>
      option
        .setName('name')
        .setDescription('What is the display name of your character?')
        .setRequired(true)
        .setMinLength(2)
        .setMaxLength(32))
    .addAttachmentOption(option =>
        option
          .setName('avatar')
          .setDescription('What does your character look like?')
          .setRequired(true)),
	async execute(interaction, client) {
    // Fetch the input values from the interaction's options
    const tag = interaction.options.getString('tag');
    const name = interaction.options.getString('name');
    const avatar = interaction.options.getAttachment('avatar');

    // Fetch a full list of all characters for this user
    let characters = await charactersData.get(interaction.user);

    // Make sure the user doesn't exceed the maximum amount of configured characters
    if (characters.length + 1 >= maxCharacters) {

      const embed = errorEmbed(client, {
        title: 'Maximum characters reached!',
        description: `You may have up to ${maxCharacters} characters. You can view your characters with \`/list\` and delete some using \`/delete\`.`,
      });

      await interaction.reply({ embeds: [embed], ephemeral: true });
      return;
    }

    // Make sure the user is actually uploading an image
    if (!avatar.contentType.startsWith('image')) {

      const embed = errorEmbed(client, {
        title: 'Invalid avatar format!',
        description: 'The uploaded avatar attachment must be an image. Please try again with a file with an extension such as \`.png\` or \`.jpg\`.'
      });

      await interaction.reply({ embeds: [embed], ephemeral: true });
      return;
    }

    const { character } = await charactersData.single(interaction.user, tag) || {};

    // Let's check if the provided tag isn't in use yet
    if (character) {
      const embed = errorEmbed(client, {
        title: 'Tag already in use!',
        description: `The tag \`${tag}\` is already in use by another character. Use \`/list\` to view your previously created characters.`
      });

      await interaction.reply({ embeds: [embed], ephemeral: true });
      return;
    }

    // Add the newly created character to the user's character dataset
    await charactersData.set(interaction.user, [...characters, {
      name: name,
      tag: tag,
      avatarURL: avatar.url,
    }]);

    const embed = successEmbed(client, {
      title: 'Character created!',
      description: `You can now use your character **${name}** with \`/say\` or view all of your characters using \`/list\`. Have fun!`,
    }).setImage(avatar.url);

    await interaction.reply({ embeds: [embed], ephemeral: true });
	},
};
