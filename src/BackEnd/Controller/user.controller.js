const { userService } = require("../Service");

let postuser = async (req, res) => {
  try {
    let body = req.body;
    let email = body.email;

    let duplicate = await userService.finadname(email);

    if (duplicate) {
      throw new Error(`"${duplicate.email}" already exists`);
    }

    let result = await userService.postuser(body);

    if (!result) {
      throw new Error("Something went wrong");
    }
    res.status(201).json({
      message: "User created successfully",
      result,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

let getuser = async (req, res) => {
  try {
    let result = await userService.getuser();
    res.status(200).json({
      message: "Get all users successfully",
      result,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

let deleteuser = async (req, res) => {
  try {
    let { id } = req.params;
    let result = await userService.deleteuser(id);
    res.status(200).json({
      message: "Deleted successfully",
      result,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

let updateuser = async (req, res) => {
  try {
    let body = req.body;
    let { id } = req.params;
    let result = await userService.updateuser(id, body);
    res.status(200).json({
      message: "User updated successfully",
      body,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = { postuser, getuser, deleteuser, updateuser };
