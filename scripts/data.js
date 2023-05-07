const { QuickDB } = require('quick.db');
const db = new QuickDB();

(async () => {
  const data = await db.startsWith('characters_');

  for (const user of data) {
    for (const character of user.value) {
      console.log(character);
    }
  }
})();
