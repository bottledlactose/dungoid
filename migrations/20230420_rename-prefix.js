const { QuickDB } = require('quick.db');
const db = new QuickDB();

(async () => {
  const charactersData = await db.startsWith('characters_');

  for (const data of charactersData) {
    for (const i in data.value) {

      if ('prefix' in data.value[i]) {
        data.value[i].tag = data.value[i].prefix;
        delete data.value[i].prefix;
      }
    }

    await db.set(data.id, data.value);
    console.log(`${data.id} successfully migrated!`);
  }
})();
