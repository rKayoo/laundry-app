const express = require('express');
const server = express();
const path = require('path');
const router = express.Router();
const sqlite3 = require('sqlite3');

const db = new sqlite3.Database('./database.db', sqlite3.OPEN_READWRITE, (err) => {
	if(err) return console.error(err.message);

	console.log("Connected to database!")
});

server.use(express.static(__dirname + '/public'));

server.use(express.urlencoded({ extended: true}));

server.get("/", (req, res) => {
  return res.sendFile(path.join(__dirname,"./frontend", "index.html"));
});

server.get('/login', (req, res) => {
  return res.sendFile(path.join(__dirname,"./frontend", "login.html"));
});

server.post('/login', (req, res) => {
  const id = req.body.usfID;
  const password = req.body.password;

  let sql = `SELECT * FROM users WHERE (usfID = "${id}" AND password = "${password}")`

  var userExists;

  db.all(sql, (err, rows) => {
    if(err) {
        console.log(err);
        return res.json({ status: 'error', error: 'Username or Password is incorrect!' });
    }

    if (!rows || rows == 0) {
      res.status(400);
      return res.json({ status: 'error', error: 'Username or Password is incorrect!' });
    }

    rows.forEach((row) => {
        if (row.usfID === id && row.password === password) {
          userExists = true;
        } else {
          userExists = false;
          db.close();
        }

        console.log(userExists);

        if (userExists = true) {
          res.redirect('/');
        }
        else { 
          res.json({ status: 'error', error: 'Username or Password is incorrect!' }); 
        }
    });

  });
});

server.get('/register', (req, res) => {
  return res.sendFile(path.join(__dirname,"./frontend", "register.html"));
});

server.post('/register', (req, res) => {
  const keys = Object.keys(req.body);

  for(key of keys) {
    if (req.body[key] == '' || !req.body[key]) {
      return res.send('Please, fill all the fields!');
    }
  } 
  
  const query = `INSERT INTO users(
    usfId,
    name,
    lastName,
    email,
    password
  ) VALUES(?, ?, ?, ?, ?)`;

  const values = [
    req.body.usfID,
    req.body.name,
    req.body.lastName,
    req.body.email,
    req.body.password
  ]

  db.run(query, values, function(err, results) {
    if(err) {
      		return console.error(err.message); 
      	}
      	console.log('A new row was added');
  });

  return res.redirect("/");
});

server.listen(5000, () => console.log("server is running"));