const { QuickDB } = require('quick.db');
const db = new QuickDB();

const { maxAverageHistory } = require('../config.json');

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
  },
  update: async (user, tag, data) => {
    const characters = await charactersData.get(user);

    for (const i in characters) {
      if (characters[i].tag === tag) {
        // Update the values of the collection
        characters[i].avatarURL = data.avatarURL;
        // Overwrite the old character data array with the new one
        await charactersData.set(user, characters);
        return true;
      }
    }

    return false;
  },
  delete: async (user, tag) => {
    const characters = await charactersData.get(user);

    for (const i in characters) {
      if (characters[i].tag === tag) {
        // Splice the index of the collection
        characters.splice(i, 1);
        // Overwrite the old character data array with the new one
        await charactersData.set(user, characters);
        return true;
      }
    }

    return false;
  },
  message: async (user, tag, message) => {
    const characters = await charactersData.get(user);

    for (const i in characters) {
      if (characters[i].tag === tag) {
        ++characters[i].messageCount;

        if (!('messageAverage' in characters[i]))
          characters[i].messageAverage = [];

        if (characters[i].messageAverage.length >= maxAverageHistory)
          characters[i].messageAverage.shift();

        characters[i].messageAverage.push(message.length);
        await charactersData.set(user, characters);

        return true;
      }
    }

    return false;
  }
};

const logData = {
  get: async guild => await db.get(`log_${guild.id}`) || null,
  set: async (guild, channel) => await db.set(`log_${guild.id}`, channel.id),
};

module.exports.charactersData = charactersData;
module.exports.logData = logData;
