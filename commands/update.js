const { SlashCommandBuilder } = require('discord.js');
const { charactersData } = require('../modules/data');
const { errorEmbed, successEmbed } = require('../modules/embed');
const { maxCharacters } = require('../config.json');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('update')
		.setDescription('Update an existing alias or character')
    .addStringOption(option =>
      option
        .setName('tag')
        .setDescription('What is the unique tag for your character?')
        .setRequired(true)
        .setMaxLength(6))
    .addAttachmentOption(option =>
      option
        .setName('avatar')
        .setDescription('What does your character look like?')
        .setRequired(true)),
	async execute(interaction, client) {
    const tag = interaction.options.getString('tag');
    const avatar = interaction.options.getAttachment('avatar');

    // Make sure the user is actually uploading an image
    if (!avatar.contentType.startsWith('image/')) {

      const embed = errorEmbed(client)
        .setTitle('Invalid avatar!')
        .setDescription(`The uploaded avatar attachment must be an image.`);

      await interaction.reply({ embeds: [embed], ephemeral: true });
      return;
    }

    let characters = await charactersData.get(interaction.user);

    for (const i in characters) {
      if (characters[i].tag == tag) {

        characters[i].avatarURL = avatar.url;
        await charactersData.set(interaction.user, characters);

        const embed = successEmbed(client)
          .setTitle('Character updated!')
          .setImage(avatar.url)
          .setDescription(`${characters[i].name}\'s avatar has been successfully updated.`);

        await interaction.reply({ embeds: [embed], ephemeral: true });
        return;
      }
    }

    const embed = errorEmbed(client)
      .setTitle('Failed to update character!')
      .setDescription(`You don't have any characters with the tag \`${tag}\`! `
        + `You can view your characters with \`/list\`.`);

    await interaction.reply({ embeds: [embed], ephemeral: true });
	},
};
