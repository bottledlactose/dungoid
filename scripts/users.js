const { QuickDB } = require('quick.db');
const db = new QuickDB();

(async () => {
  await db.all().then(result => console.log(result));
})();
