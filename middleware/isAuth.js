const TryAndCAtch = require('../utils/asyncCatch')
const users = require('../models/user.model')
const {promisify} = require("util")
const jwt = require('jsonwebtoken')
const AppError = require('../utils/apperror')
const { log } = require('console')

exports.isAuth = TryAndCAtch(async (req, res, next) => {
    // return next(new AppError("you are logged in ",400))
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        token = req.headers.authorization.split(" ")[1];
        
        const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRETKEY);
        const currentuser = await users.findById(decoded.id);
     
        if (!currentuser) {
          return next(new AppError(" user does not find given token..",401))  
        }
        if (currentuser.passwordChanged(decoded.iat)) {
            return next(new AppError("you are recently change the password",401))
        }
        req.users = currentuser;
      
    } else {
        return next(new AppError("your isAuth is not working",401))
    }
    next()
  
})