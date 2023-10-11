const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, "Please enter your email"],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, "Please enter valid mail id"],
  },

  firstName: {
    type: String,
    required: [true, "Please enter your first name"],
    minlength: 4,
  },
  lastName: {
    type: String,
    required: [true, "Please enter your last name"],
    minlength: 4,
  },
  gender: {
    type: String,
  required: [true, "Please tell us your gender"],
  },
  phone: {
    type: "number",
    min: 1000000000, //10-digit validation
    max: 9999999999, //10-digit validation
  },

  dob: {
    type: Date,
    required: [true, "Please enter your DOB"],
  },
  password: {
    type: String,
    required: [true, "Please enter your password"],
  },
  confirmPassword: {
    type: String,
    required: [true, "Please enter your confirm password"],
    validate: {
      validator: function(pwd) {
        return pwd === this.password;
      },
    },
    message: "Confirm password  doesn't match with password",
  },
});

UserSchema.pre("save", async function (next) {
  //hash the password
  this.password = await bcrypt.hash(this.password, 12);

  //delete  confirmPassword field
  this.confirmPassword = undefined;
  next();
});


UserSchema.methods.comparePassword = async function (
  candidatePassword,
  userPassword
)  {
  return await bcrypt.compare(candidatePassword, userPassword);
};

const User = mongoose.model("User", UserSchema);

module.exports = User;
