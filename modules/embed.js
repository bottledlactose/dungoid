const { EmbedBuilder } = require('discord.js');

// Constant color codes used in type-specific embeds
const colors = {
  error: 0xf47b67,
  success: 0x23a55a,
  info: 0x5865f2,
};

// Provide a convenient base for the actual embed types to build off of
const baseEmbed = client => {
  return new EmbedBuilder()
    .setFooter({
      text: `Posted by ${client.user.username}`,
      iconURL: client.user.avatarURL()
    })
    .setTimestamp();
};

// Define some shorthand embed type builders with their respective color
const errorEmbed = client => baseEmbed(client).setColor(colors.error);
const successEmbed = client => baseEmbed(client).setColor(colors.success);
const infoEmbed = client => baseEmbed(client).setColor(colors.info);

module.exports.errorEmbed = errorEmbed;
module.exports.successEmbed = successEmbed;
module.exports.infoEmbed = infoEmbed;
