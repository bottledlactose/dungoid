const { QuickDB } = require('quick.db');
const db = new QuickDB();

const charactersData = {
  get: async user => await db.get(`characters_${user.id}`) || [],
  set: async (user, characters) => await db.set(`characters_${user.id}`, characters),
};

const logData = {
  get: async guild => await db.get(`log_${guild.id}`) || [],
  set: async (guild, channel) => await db.set(`log_${guild.id}`, channel.id),
};

module.exports.charactersData = charactersData;
module.exports.logData = logData;
