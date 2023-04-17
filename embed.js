const { EmbedBuilder } = require('discord.js');

module.exports.colors = {
  default: 0x2b59ff,
  error: 0xff4133,
  success: 0x9dff26
}

module.exports.default = client => {
  return new EmbedBuilder()
    .setColor(module.exports.colors.default)
    .setFooter({ text: `Posted by ${client.user.username}`, iconURL: client.user.avatarURL() })
    .setTimestamp();
}

module.exports.error = client => {
  return module.exports.default(client)
    .setColor(module.exports.colors.error);
}

module.exports.success = client => {
  return module.exports.default(client)
    .setColor(module.exports.colors.success);
}
