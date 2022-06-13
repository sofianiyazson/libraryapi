const express = require("express");
const bodyParser = require("body-parser");
const db = require("./database");
const app = express();
app.use(bodyParser.json());

app.get("/books/", (req, res) => {
	const sql = "SELECT * FROM books;";
	const params = [];
	db.all(sql, params, (error, rows) => {
		if (error) {
			return res.status(400).json({ error: error.message })
		}

		return res.json({
			status: "success",
			message: null,
			data: rows
		});
	});
});

app.get("/books/:id", (req, res) => {
	const id = req.params.id;
	const sql = `SELECT * FROM books where id=${id};`;
	const params = [];
	db.get(sql, params, (error, row) => {
		if (error) {
			return res.status(400).json({ error: error.message })
		}

		if(!row) {
			return res.status(404).json({
				status: "error",
				message: `The book with id ${id} could not be found.`,
				data: null
			});
		}

		return res.json({
			status: "success",
			message: null,
			data: row
		});
	});
});

app.post("/books/", (req, res) => {
	const data = req.body;
	const sql = `INSERT INTO books (title, author, genre) VALUES ('${data.title}', '${data.author}', '${data.genre}');`;
	const params = [];
	db.get(sql, params, error => {
		if (error) {
		 	return res.status(400).json({ error: error.message })
		}

		return res.json({
			status: "success",
			message: null,
			data: null
		});
	});
});

app.put("/books/:id", (req, res) => {
	const data = req.body;
	const id = req.params.id;
	const sql = `UPDATE books SET title='${data.title}', author='${data.author}', genre='${data.genre}' WHERE id=${id};`;
	const params = [];
	db.get(sql, params, error => {
		if (error) {
		 	return res.status(400).json({ error: error.message })
		}

		return res.json({
			status: "success",
			message: null,
			data: null
		});
	});
});

app.delete("/books/:id", (req, res) => {
	const id = req.params.id;
	const sql = `DELETE FROM books where id=${id};`;
	const params = [];
	db.get(sql, params, (error, row) => {
		if (error) {
			return res.status(400).json({ error: error.message })
		}

		return res.json({
			status: "success",
			message: null,
			data: null
		});
	});
});

app.listen(4000, () => {
	console.log("Server running at port 4000.");
});