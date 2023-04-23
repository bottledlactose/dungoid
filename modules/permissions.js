const { PermissionsBitField } = require('discord.js');

const has = (channel, permissions) => channel.permissionsFor(channel.guild.members.me).has(permissions);

const hasManageWebhooks = channel => has(channel, PermissionsBitField.Flags.ManageWebhooks);
const hasSendMessages = channel => has(channel, PermissionsBitField.Flags.SendMessages);

module.exports.hasManageWebhooks = hasManageWebhooks;
module.exports.hasSendMessages = hasSendMessages;
