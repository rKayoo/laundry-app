const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database('../database.db', sqlite3.OPEN_READWRITE, (err) => {
	if(err) return console.error(err.message);

	console.log("Connected to database!")
});

// db.run(`
//     CREATE TABLE users (
//       usfId TEXT,
//       name TEXT,
//       lastName TEXT,
//       email TEXT,
//       password TEXT
//     )
//   `)

// const newRow = `INSERT INTO users(
//               usfID,
//               name,
//               lastName,
//               email
//             ) VALUES(?, ?, ?, ?)`;

const seeRows = `SELECT * FROM users`;

// db.run( newRow, ["19287364", "Tro", "Bla", "tro@usf.edu"], (err) => {
// 	if(err) {
// 		return console.error(err.message); 
// 	}
// 	console.log('A new row was added');
// });

db.all(seeRows, [], (err, rows) => {
  if(err) return console.error(err.message);

  rows.forEach((rows) => {
    console.log(rows);
  })
})

db.close((err) => {
  if (err) return console.error(err.message);
});