var mysql = require("mysql");
var connection = mysql.createConnection({
  host: process.env.HOST,
  user: process.env.USER,
  password: process.env.PASSWORD,
  database: "rideshare"
});

connection.connect();

function filter(req, res, next) {
  try {
		if (!queryParam.queryParam.departure || !queryParam.queryParam.departure || !queryParam.date) {
			res.status(400).send("Missing Param.");
		}
		if (!(/^2[0-9]{3}-((0[1-9])|(1[0-2]))-[0-3][0-9]$/).test(queryParam.date)) {
			res.status(400).send("Invalid date format.");
		}

    var queryParam = req.query;
    sql = `SELECT * FROM ride WHERE departure = '${queryParam.departure}' AND destination = '${queryParam.destination}' AND date = '${queryParam.date}';`;
    connection.query(sql, function(err, result, fields) {
      if (err) {
        throw err;
      }
      res.status(200).send(result);
    });
  } catch (err) {
    res.status(500).send("SERVER ERROR:" + err);
  }
}

connection.end();

module.exports = { filter };
