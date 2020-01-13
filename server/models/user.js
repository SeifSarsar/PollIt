var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var UserSchema = new Schema({
  username: {
    type: String,
    required: [true, "Username required"],
    unique: [true, "Username already exists"],
    minlength: [5, "Username can not be shorter than 5 caracters"],
    maxlength: [20, "Username can not be longer than 20 caracters"]
  },
  email: {
    type: String,
    required: [true, "Email required"],
    unique: [true, "Email already exists"]
  },
  password: {
    type: String,
    required: [true, "Password required"],
    minlength: [6, "Password can not be shorter than 6 caracters"],
    maxlength: [20, "Password can not be longer than 20 caracters"]
  }
});

UserSchema.index({ username: 1 });

module.exports = mongoose.model("user", UserSchema);
