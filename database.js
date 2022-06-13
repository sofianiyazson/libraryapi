const sqlite3 = require("sqlite3").verbose();

const db = new sqlite3.Database("./db.sqlite", (error) => {
	if (error) {
		console.error(error.message);
		throw error;
	}

	console.log("Connected to our database.");

	const statement = `CREATE TABLE books
  	( 
		id INTEGER PRIMARY KEY AUTOINCREMENT,
		title TEXT, 
		author TEXT, 
		genre TEXT
	)`;

	db.run(statement, (error) => {
		if (error) {
			console.error(error.message);
			return;
		}
	});
});

module.exports = db;