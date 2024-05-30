let express = require("express");
const { userController } = require("../Controller");
let route = express.Router();

route.post("/post", userController.postuser);
route.get("/get", userController.getuser);
route.delete("/delete/:id", userController.deleteuser);
route.put("/update/:id", userController.updateuser);

module.exports = route;
