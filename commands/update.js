const { SlashCommandBuilder } = require('discord.js');
const { charactersData } = require('../modules/data');
const { errorEmbed, successEmbed } = require('../modules/embed');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('update')
		.setDescription('Update an existing alias or character')
    .addStringOption(option =>
      option
        .setName('tag')
        .setDescription('What is the unique tag for your character?')
        .setRequired(true)
        .setAutocomplete(true))
    .addAttachmentOption(option =>
      option
        .setName('avatar')
        .setDescription('What does your character look like?')
        .setRequired(true)),
  async autocomplete(interaction) {
    const characters = await charactersData.get(interaction.user);

    const focused = interaction.options.getFocused().toLowerCase();
    const filtered = characters.filter(choice => choice.name.toLowerCase().startsWith(focused));

    await interaction.respond(
      filtered.map(choice => ({ name: choice.name, value: choice.tag })),
    );
  },
	async execute(interaction, client) {
    const tag = interaction.options.getString('tag');
    const avatar = interaction.options.getAttachment('avatar');

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

    const success = await charactersData.update(interaction.user, tag, {
      avatarURL: avatar.url
    });

    if (!success) {

      const embed = errorEmbed(client, {
        title: 'Failed to update character!',
        description: `You don't have any characters with the tag \`${tag}\`! You can view your characters with \`/list\`.`,
      });

      await interaction.reply({ embeds: [embed], ephemeral: true });
    } else {

      const embed = successEmbed(client, {
        title: 'Character updated!',
        description: `Your character **${character.name}**'s avatar updated successfully! Thank you for using ${client.user.username}!`,
      }).setImage(avatar.url);

      await interaction.reply({ embeds: [embed] });
    }
	},
};
