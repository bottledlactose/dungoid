const { EmbedBuilder } = require('discord.js');

// Constant color codes used in type-specific embeds
const colors = {
  error: 0xff5921,
  success: 0x78ed2b,
  info: 0x305df0,
};

// Provide a convenient base for the actual embed types to build off of
const base = client => {
  return new EmbedBuilder()
    .setFooter({
      text: `Posted by ${client.user.username}`,
      iconURL: client.user.avatarURL()
    })
    .setTimestamp();
};

// Define some shorthand embed type builders with their respective color
const error = client => base(client).setColor(colors.error);
const success = client => base(client).setColor(colors.success);
const info = client => base(client).setColor(colors.info);

module.exports = { error: error, success: success, info: info };