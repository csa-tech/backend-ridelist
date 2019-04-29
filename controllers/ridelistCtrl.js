var mysql = require('mysql');
var connection = mysql.createConnection({
	host     : 'mydatabase.c9ukuxyqda4n.us-west-1.rds.amazonaws.com',
  	user     : 'CSAUser',
  	password : 'Csa666!!',
  	database : 'rideshare'
});

connection.connect();

function filter(req,res,next) {
	try {

  		var queryParam = req.query;
  		sql = `SELECT * FROM ride_info WHERE departure = '${queryParam.departure}' AND destination = '${queryParam.destination}' AND date = '${queryParam.date}';`;
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
