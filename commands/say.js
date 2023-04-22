const { SlashCommandBuilder, EmbedBuilder, ButtonBuilder, ButtonStyle, ActionRowBuilder } = require('discord.js');
const { charactersData, logData } = require('../modules/data');
const { errorEmbed, logEmbed } = require('../modules/embed');
const { hasManageWebhooks } = require('../modules/permissions');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('say')
		.setDescription('Say your message as one of your characters')
    .addStringOption(option =>
      option
        .setName('tag')
        .setDescription('What is the unique tag for your character?')
        .setRequired(true)
        .setAutocomplete(true))
    .addStringOption(option =>
      option
        .setName('message')
        .setDescription('What do you want your character to say?')
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
    // Fetch the input values from the interaction's options
    const tag = interaction.options.getString('tag');
    const message = interaction.options.getString('message');

    // Make sure the application is allowed to access webhooks which is needed to proxy messages
    if (!hasManageWebhooks(interaction.guild)) {

      const embed = errorEmbed(client, {
        title: 'Missing permissions!',
        description: 'I don\'t have permissions to \`Manage Webhooks\`! Please ask your server administrator to enable them.'
      });

      await interaction.reply({ embeds: [embed], ephemeral: true });
      return;
    }

    // Try to fetch a character with the specified tag
    const { character } = await charactersData.single(interaction.user, tag) || {};

    // Ensure a character with the specified tag actually exists
    if (!character) {
      const embed = errorEmbed(client, {
        description: `You don't have a character with tag \`${tag}\`!`
      });

      await interaction.reply({ embeds: [embed], ephemeral: true });
      return;
    }

    // Attempt to fetch the first webhook that is named after the client's username
    let webhook = await interaction.channel.fetchWebhooks()
      .then(webhooks => webhooks.filter(w => w.name === client.user.username).first());

    // Create a new webhook if there was none found yet and use it immediately
    if (!webhook) {
      webhook = await interaction.channel.createWebhook({
        name: client.user.username
      });
    }

    // Construct a new message to be sent through the webhook
    const webhookMessage = await webhook.send({
      avatarURL: character.avatarURL,
      username: character.name,
      content: message,
    });

    // There's no way to not send a reply to an interaction...
    const reply = await interaction.reply({ content: '** **', ephemeral: true });
    setTimeout(() => reply.delete(), 1);

    // Get the channel ID to log moderation information to
    const channelId = await logData.get(interaction.guild);

    // Check if the channel exists before proceeding
    if (channelId && interaction.guild.channels.cache.has(channelId)) {
      // Fetch the channel from the channel caching collection
      const channel = interaction.guild.channels.cache.get(channelId);

      const embed = logEmbed(client, {
        description: message
      })
      .setAuthor({ name: character.name, iconURL: character.avatarURL })
      .setFooter({ text: `ID: ${webhookMessage.id}` });

      const button = new ButtonBuilder()
        .setLabel('Jump')
        .setURL(webhookMessage.url)
        .setStyle(ButtonStyle.Link);

      const row = new ActionRowBuilder()
        .addComponents(button);

      channel.send({
        content: `New message sent by ${interaction.user} in <#${interaction.channel.id}>:`,
        embeds: [embed],
        components: [row]
      });
    }

    await charactersData.message(interaction.user, tag, message);
	},
};
