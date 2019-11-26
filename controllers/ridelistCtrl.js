var mysql = require('mysql');
var connection = mysql.createConnection({
	host: process.env.HOST,
	user: process.env.USER,
	password: process.env.PASSWORD,
	database: "rideshare"
});

connection.connect();

function filter(req,res,next) {
	try {
		var queryParam = req.query;
		if (!queryParam.departure || !queryParam.departure) {
			res.status(400).send("Missing Param.");
		}
  		sql = `SELECT * FROM ride WHERE departure = '${queryParam.departure}' AND destination = '${queryParam.destination}';`;

		connection.query(sql,function(err,result,fields) {
			if (err) {throw err;}
			res.status(200).send(result);
		});
	} catch (err) {
		res.status(500).send('SERVER ERROR:' + err);
		connection.end();
	}
}

module.exports = {filter}