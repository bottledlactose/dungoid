const { PermissionsBitField } = require('discord.js');

const has = (guild, permissions) => guild.members.me.permissions.has(permissions);
const hasManageWebhooks = guild => has(guild, PermissionsBitField.Flags.ManageWebhooks);

module.exports.has = has;
module.exports.hasManageWebhooks = hasManageWebhooks;
