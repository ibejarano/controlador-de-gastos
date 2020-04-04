const express = require("express");
const {PORT} = require('./config');
const app = express();

app.listen(3000, () => {
  console.log(`Server is up and running on port: ${PORT}`);
});
