const { QuickDB } = require('quick.db');
const db = new QuickDB();

const charactersData = {
  get: async user => await db.get(`characters_${user.id}`) || [],
  set: async (user, characters) => await db.set(`characters_${user.id}`, characters),
};

module.exports.charactersData = charactersData;
