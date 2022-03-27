const connect = require('@databases/sqlite');
const {sql} = require('@databases/sqlite');

const db = connect('database.db');

async function prepare() {
  await db.query(sql`
    CREATE TABLE IF NOT EXISTS users (
      usfId TEXT,
      name TEXT,
      lastName TEXT,
      email TEXT
    );
  `);
}
const prepared = prepare();

// async function set(usfId,name, lastName, email) {
//   await prepared;
//   await db.query(sql`
//     INSERT INTO users (
//       usfID,
//       name,
//       lastName,
//       email)
// `);
// }