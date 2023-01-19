require("dotenv").config();
const jwt = require("jsonwebtoken");
const cookieParser = require('cookie-parser')

const authToken = {
  
  generateToken: (email) => {
    let token = jwt.sign({ email: email}, process.env.ACCESS_TOKEN_S, {
      expiresIn: "10h",
    });
    return token;
  },
  authCookie: (req, res, next) => {
    if(!req.headers.cookie){
      res.status(403).render('message',{type:'Error:', message:'No tienes autorización',link:'/login',flag: true});
    };
    const reqToken = cookieParser.JSONCookies(req.headers.cookie);
    const token = reqToken.split('=')[1]
    //console.log("cookieParser: ",token);
    const decodeToken = jwt.decode(token, process.env.ACCESS_TOKEN_S);
    if(!decodeToken){
      res.status(403).render('message',{type:'Error:', message:'Token no válido',link:'/login',flag: true});
    };
    req.user = decodeToken.email
    next();
  }
};

module.exports = authToken;