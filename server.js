const express = require("express");
const routes = require("./routes");
const sequelize = require("./config/connection");
const app = express();
require("dotenv").config();
const PORT = process.env.PORT;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(routes);
sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log("Now listening"));
});
