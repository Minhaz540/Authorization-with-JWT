require("dotenv").config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");

const middlewares = require("./middlewares/middleware");
const routes = require("./routes/route");

middlewares(app);
routes(app);

const port = process.env.PORT || 8080;
mongoose
	.connect("mongodb://localhost:27017/jwtTutorial")
	.then(() => {
		app.listen(port, () => {
			console.log(`Server running at http://localhost:${port}`);
		});
	})
	.catch((err) => console.error(err));
