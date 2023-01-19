const mongoose = require("mongoose");
require('dotenv').config()

mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;
db.on("error", error => console.log(error));
db.once("open", () => console.log("Connection to DDBB established"));

module.exports = mongoose






