const { EmbedBuilder } = require('discord.js');

// Constant color codes used in type-specific embeds
const colors = {
  error: 0xed4245,
  success: 0x57f287,
  info: 0x5865f2,
  log: 0x23272a,
};

// Provide a convenient base for the actual embed types to build off of
const baseEmbed = (client, options = {}) => {
  const embed = new EmbedBuilder()
    .setFooter({
      text: `Posted by ${client.user.username}`,
      iconURL: client.user.avatarURL()
    })
    .setTimestamp();

  if ('title' in options)
    embed.setTitle(options.title);

  if ('description' in options)
    embed.setDescription(options.description);

  return embed;
};

// Define some shorthand embed type builders with their respective color
const errorEmbed = (client, options) => baseEmbed(client, options).setColor(colors.error);
const successEmbed = (client, options) => baseEmbed(client, options).setColor(colors.success);
const infoEmbed = (client, options) => baseEmbed(client, options).setColor(colors.info);
const logEmbed = (client, options) => baseEmbed(client, options).setColor(colors.log);

module.exports.errorEmbed = errorEmbed;
module.exports.successEmbed = successEmbed;
module.exports.infoEmbed = infoEmbed;
module.exports.logEmbed = logEmbed;
