// src/server.js (örnek ilgili kısım)
const express = require("express");
const app = express();

// body parser
app.use(express.json());

// diğer middleware'ler, logger vb.

app.use("/api/customers", require("./routes/customers"));

// hata handler, 404 vs.
// server start
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server listening on ${port}`));

module.exports = app; // test için export et
