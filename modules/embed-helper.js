const { EmbedBuilder } = require('discord.js');

const colors = {
  error: 0xff4133,
  success: 0x9dff26,
  info: 0x2b59ff,
};

const base = client => {
  return new EmbedBuilder()
    .setFooter({
      text: `Posted by ${client.user.username}`,
      iconURL: client.user.avatarURL()
    })
    .setTimestamp();
};

const error = client => base(client).setColor(colors.error);
const success = client => base(client).setColor(colors.success);
const info = client => base(client).setColor(colors.info);

module.exports = {
  error: error,
  success: success,
  info: info,
};
