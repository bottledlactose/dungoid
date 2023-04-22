const { QuickDB } = require('quick.db');
const db = new QuickDB();

const charactersData = {
  get: async user => await db.get(`characters_${user.id}`) || [],
  set: async (user, characters) => await db.set(`characters_${user.id}`, characters),
  single: async (user, tag) => {
    const characters = await charactersData.get(user);

    for (const i in characters) {
      if (characters[i].tag === tag) {
        return { character: characters[i], index: i }
      }
    }

    return null;
  }
};

const logData = {
  get: async guild => await db.get(`log_${guild.id}`) || null,
  set: async (guild, channel) => await db.set(`log_${guild.id}`, channel.id),
};

module.exports.charactersData = charactersData;
module.exports.logData = logData;
