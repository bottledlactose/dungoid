const { QuickDB } = require('quick.db');
const db = new QuickDB();

// Define some functions that simplify access to the user's character dataset
const get = async user => await db.get(`characters_${user.id}`) || [];
const set = async (user, characters) => await db.set(`characters_${user.id}`, characters);

module.exports = { get: get, set: set };
