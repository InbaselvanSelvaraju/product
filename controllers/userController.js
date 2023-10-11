const User = require("../models/user.model");
const asyncCatch = require("../utils/asyncCatch");
const jwt = require("jsonwebtoken");
const AppError = require("../utils/apperror")



const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRETKEY);
};

exports.getAllUsers = asyncCatch(async (req, res, next) => {
  const users = await User.find();
  res.status(200).json({
    status: "success",
    results: users.length,
    data: users,
  });
});

exports.signUp = asyncCatch(async (req, res, next) => {
  console.log(req.body);
  const newUser = await User.create(req.body);
  const token = signToken(newUser._id);
  console.log(newUser);
  res.status(201).json({
    status: "Success",
    data: newUser,
    token,
  });
});


exports.getUser = asyncCatch(async (req, res, next) => {
  const user = await User.findById(req.params.id);
  res.status(200).json({
    status: "success",
    data: user,
  });
});

exports.updateMe = asyncCatch(async (req, res, next) => {
  const updateUser = await User.findByIdAndUpdate(req.params.id, req.body);
  res.status(200).json({
    status: "Success",
    data: updateUser,
  });
});

exports.deleteMe = asyncCatch(async (req, res, next) => {
  await User.findByIdAndDelete(req.params.id);
  res.status(204).json({
    status: "success",
  });

});

exports.login = asyncCatch(async (req, res, next) => {
  const { email, password } = req.body;
  if (email && password) {
    const user = await User.findOne({ email });
    if (!user || !(await user.comparePassword(password, user.password))) {
      return next(new AppError("please enter valid email and password", 400));
    }
    const token = signToken(User._id);
    res.status(200).json({
      status: "success",
      token,
    });
  }
});



      
    
  
