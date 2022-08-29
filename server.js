const express = require("express");
const exphbs = require("express-handlebars");
const hbs = exphbs.create({});
const routes = require("./controllers");
const path = require("path");
const sequelize = require("./config/connection");
const app = express();
require("dotenv").config();
const PORT = process.env.PORT;
app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.use(routes);
sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log("Now listening"));
});
