module.exports = {
    post: function (req, res) {
    const keys = Object.keys(req.body);


    for(key of keys) {
      if (req.body[key] == '' || !req.body[key]) {
        return res.send('Please, fill all the fields!');
      }
    } 

    const query = `INSERT INTO users(
      usfID,
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

    db.query(query, values, function(err, results) {
        if(err) throw `Database error!`

        callback(results.rows[0]);
    })

    return res.redirect("/");
  }
}