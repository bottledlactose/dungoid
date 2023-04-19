const { SlashCommandBuilder } = require('discord.js');
const embedModule = require('../modules/embed');
const characterModule = require('../modules/character');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('create')
		.setDescription('Create a new character')
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

    if (characters.length + 1 >= config.maxCharacters) {

      const embed = embedModule.error(client)
        .setTitle('Maximum characters reached!')
        .setDescription(`You may have up to 20 characters. You can delete characters using \`/delete\``);

      await interaction.reply({ embeds: [embed], ephemeral: true });
      return;
    }

    if (!avatar.contentType.startsWith('image/')) {

      const embed = embedModule.error(client)
        .setTitle('Please attach an image!')
        .setDescription(`The uploaded avatar attachment must be an image`);

      await interaction.reply({ embeds: [embed], ephemeral: true });
      return;
    }

    for (const c of characters) {
      if (c.prefix === prefix) {
        const embed = embedModule.error(client)
          .setTitle('Prefix already in use!')
          .setDescription(`The prefix \`${prefix}\` is already in use by another character`);

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
      .setTitle('Character created!')
      .setDescription('You can now use your character by using \`/say\` or view all yours characters using \`/list\`');

    await interaction.reply({ embeds: [embed], ephemeral: true });
	},
};
