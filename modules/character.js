const { QuickDB } = require('quick.db');
const db = new QuickDB();

const get = async user => await db.get(`characters_${user.id}`) || [];
const set = async (user, characters) => await db.set(`characters_${user.id}`, characters);

module.exports = {
  get: get,
  set: set,
};
