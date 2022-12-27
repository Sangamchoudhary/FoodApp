const userModel = require("../Models/userModel");

module.exports.getUser = async function getUser(req, res) {
  let id = req.id;
  let user = await userModel.findById(id);
  if (user) return res.send(user);
  else res.json({ message: "Logged in but id not found" });
};

module.exports.updateUser = async function updateUser(req, res) {
  try {
    let id = req.params.id;
    let user = await userModel.findById(id);
    let dataToBeUpdated = req.body;
    if (!user) return res.json({ message: "user not found" });
    let keys = [];
    for (let key in dataToBeUpdated) {
      keys.push(key);
    }
    for (let i = 0; i < keys.length; i++) {
      user[keys[i]] = dataToBeUpdated[keys[i]];
    }
    const updatedUserData = await user.save();
    res.json({ message: "data updated success", data: updatedUserData });
  } catch (err) {
    res.json({ error: err.message });
  }
};

module.exports.deleteUser = async function deleteUser(req, res) {
  try {
    let id = req.params.id;
    let deletedUser = await userModel.findByIdAndDelete(id);
    if (!deletedUser) return res.json({ message: "user not found" });
    res.status(203).json({
      message: "User Deleted Successfully",
      data: deletedUser,
    });
  } catch (err) {
    res.json({ error: err.message });
  }
};

module.exports.getAllUser = async function getAllUser(req, res) {
  let users = await userModel.find();
  if (!users) return res.json({ message: "0 users now" });
  res.json({ message: "all users fetched", user: users });
};

module.exports.updateProfileImage = function updateProfileImage(req, res) {
  res.json({ message: "file upload successfully" });
};
