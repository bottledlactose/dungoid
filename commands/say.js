const { SlashCommandBuilder } = require('discord.js');
const embedHelper = require('../modules/embed-helper');

const { QuickDB } = require('quick.db');
const db = new QuickDB();

module.exports = {
	data: new SlashCommandBuilder()
		.setName('say')
		.setDescription('Says your message as one of your characters')
    .addStringOption(option =>
        option
          .setName('prefix')
          .setDescription('The target prefix')
          .setRequired(true)
          .setMaxLength(6))
    .addStringOption(option =>
      option
        .setName('message')
        .setDescription('The message to be sent')
        .setRequired(true)),
	async execute(interaction, client) {
    const prefix = interaction.options.getString('prefix');
    const message = interaction.options.getString('message');

    const characters = await db.get(`characters_${interaction.user.id}`);
    let character = null;

    for (const c of characters) {
      if (c.prefix === prefix) {
        character = c;
        break;
      }
    }

    if (!character) {
      const embed = embedHelper.error(client)
        .setDescription(`You don't have a character with prefix \`${prefix}\`!`);

      await interaction.reply({ embeds: [embed], ephemeral: true });
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
      avatarURL: character.avatarUrl,
      username: character.name,
      content: message,
    });

    const embed = embedHelper.success(client)
      .setTitle('Done!')
      .setDescription(`Your message has been successfully posted as **${character.name}**!`);

    await interaction.reply({ embeds: [embed], ephemeral: true });
    setTimeout(() => interaction.deleteReply(), 2500);
	},
};
