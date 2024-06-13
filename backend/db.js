const mongoose = require("mongoose");
// const url = process.env.MONGODB_URL;

mongoose.connect("mongodb+srv://tavishpaytm:paytmpassword@cluster0.kj0a7nl.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0");

const userSchema = new mongoose.Schema({
  userName: String,
  password: String,
  firstName: String,
  lastName: String,
});

const accountSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  balance: Number,
});

const User = mongoose.model("User", userSchema);
const Account = mongoose.model("Account", accountSchema);

module.exports = {
  User,
  Account
};
