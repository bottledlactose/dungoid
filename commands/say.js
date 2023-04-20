const { SlashCommandBuilder, PermissionsBitField } = require('discord.js');
const characterModule = require('../modules/character');
const embedModule = require('../modules/embed');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('say')
		.setDescription('Say your message as one of your characters')
    .addStringOption(option =>
        option
          .setName('tag')
          .setDescription('What is the unique tag for your character?')
          .setRequired(true)
          .setMaxLength(6))
    .addStringOption(option =>
      option
        .setName('message')
        .setDescription('What do you want your character to say?')
        .setRequired(true)),
	async execute(interaction, client) {
    const tag = interaction.options.getString('tag');
    const message = interaction.options.getString('message');

    const characters = await characterModule.get(interaction.user);
    let character = null;

    for (const c of characters) {
      if (c.tag === tag) {
        character = c;
        break;
      }
    }

    if (!character) {
      const embed = embedModule.error(client)
        .setDescription(`You don't have a character with tag \`${tag}\`!`);

      await interaction.reply({ embeds: [embed], ephemeral: true });
      return;
    }

    if (!interaction.guild.members.me.permissions.has(PermissionsBitField.Flags.ManageWebhooks)) {

      const embed = embedModule.error(client)
        .setTitle('Missing permissions!')
        .setDescription(`I don't have permissions to \`Manage Webhooks\`! `
          + `Please ask your server administrator to enable them.`);

      await interaction.reply({ embeds: [embed] });
      return;
    }

    let webhooks = await interaction.channel.fetchWebhooks();
    webhooks = webhooks.filter(w => w.name === client.user.username);

    let webhook = null;

    if (webhooks.size == 0) {
      webhook = await interaction.channel.createWebhook({
        name: client.user.username
      });
    } else {
      webhook = webhooks.first();
    }

    await webhook.send({
      avatarURL: character.avatarURL,
      username: character.name,
      content: message,
    });

    // There's no way to not send a reply to an interaction...
    const reply = await interaction.reply('** **');
    setTimeout(() => reply.delete(), 1);
	},
};
