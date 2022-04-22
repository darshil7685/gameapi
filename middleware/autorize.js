const jwt = require("jsonwebtoken");
const db = require("../helpers/db");
const {jwtSecret}=require("../config/jwt.config")

exports.authorize = function(req, res, next) {
  let token = req.headers.authorization.split(' ')[1];
  //console.log(token);

  if (!token) {
    return res.json({message:"Token not found, Provide token"})
  }
  jwt.verify(token, jwtSecret, async(err, decoded) => {
    if (err) {
      //throw "Token may be Invalid";
    return res.json({message:"Token may be Invalid"})
    }
    const user = await db.UserDetails.findOne({
        where: { user_id: decoded.user_id },
      });
      if(!user){
          //throw "You are Unauthorized";
          return res.json({message:"You are Unauthorized"})
      }
    next();
  });

  // try{
  //   const decoded=jwt.verify(token,"game_api");
  //   const user = await db.UserDetails.findOne({
  //           where: { user_id: decoded.user_id },
  //         });
  //         if(!user){
  //             throw "You are Unauthorized";
  //             //return res.json({message:"You are Unauthorized"})
  //         }
  //         next();

  // }catch(err){
  //   throw 'token may be invalid';
  // }

};
