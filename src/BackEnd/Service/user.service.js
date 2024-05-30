const { userSchema } = require("../model");

let postuser = (body) => {
  return userSchema.create(body);
};
let getuser = () => {
  return userSchema.find();
};
let deleteuser = (id) => {
  return userSchema.findByIdAndDelete(id);
};
let updateuser = (id, body) => {
  return userSchema.findByIdAndUpdate(id, body);
};
let finadname = (email) => {
  return userSchema.findOne({ email });
};
module.exports = { postuser, getuser, deleteuser, finadname, updateuser };
