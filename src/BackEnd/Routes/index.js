let express = require("express");
const route = require("./user.route");
let routes = express.Router();

routes.use("/user", route);

module.exports = routes;
