const db = require("../helpers/db");
const express = require("express");
const router = express.Router();
const Joi = require("joi");
const bcrypt = require("bcryptjs");
const jwt =require("jsonwebtoken");
const validateRequest = require("../middleware/validate-request");
//const {jwtSecret}=require("../config/jwt.config");
//const {authorize}=require("../middleware/autorize");

router.post("/registerUserDetails", registerSchema, register);
router.post('/updateUserDetails',updateSchema,update);
router.get("/getAllUserDetails", getAllUserDetails);
router.get("/getUserDetails/:id",getUserDetails);

module.exports = router;

function registerSchema(req, res, next) {
  const schema = Joi.object({
    user_id: Joi.number().required(),
    user_mail: Joi.string().allow(null),
    user_name: Joi.string().trim(),
    user_password: Joi.string(),
    user_logintype: Joi.string().required(),
    user_isActive: Joi.boolean(),
    user_amount: Joi.number(),
    user_debit_amount: Joi.number(),
  });

  validateRequest(req, next, schema);
}
function updateSchema(req, res, next) {
  const schema = Joi.object({
    user_id: Joi.number().required(),
    user_mail: Joi.string().empty(''),
    user_name: Joi.string().trim().empty(''),
    user_password: Joi.string().empty(''),
    user_logintype: Joi.string().empty(''),
    user_isActive: Joi.boolean().empty(''),
    user_amount: Joi.number().empty(''),
    user_debit_amount: Joi.number().empty('')
  });
  validateRequest(req, next, schema);
}

async function create(params) {
  const duplicateUserId = await db.UserDetails.findOne({
    where: { user_id: params.user_id },
  });
  if (duplicateUserId) {
    throw "Used Id " + params.user_id + " is already taken";
  }

  // if (params.user_name) {
  //   params.user_name = params.user_name.trim();
  //   const duplicateUserName = await db.UserDetails.findOne({
  //     where: { user_name: params.user_name },
  //   });
  //   if (duplicateUserName) {
  //     throw "username " + params.user_name + " is already taken";
  //   }
  // }
if(!(params.user_logintype == "guestlogin")){
  if (params.user_mail) {
    const duplicateMailId = await db.UserDetails.findOne({
      where: { user_mail: params.user_mail },
    });
    if (duplicateMailId) {
      throw "Mail Id " + params.user_mail + " is alreadytaken";
    }
  }
}

  if (params.user_password) {
    params.user_password = await bcrypt.hash(params.user_password, 10);
  }
  //const token = jwt.sign({ user_id:params.user_id }, jwtSecret, {});
  //console.log("Token Generated "+token);
  const user = await db.UserDetails.create(params);

  //user.token=token;
  // const { updatedAt, createdAt, ...newUser } = user;
  return user;
  //return {...user.get(),token};
}

function register(req, res, next) {
  console.log("POST /registerUserDetails API call made ");
  create(req.body)
    .then((user) => res.json(user))
    .catch(next);
}


async function updateUserDetails(params) {
  const user = await db.UserDetails.findOne({
    where: { user_id: params.user_id },
  });
  if (!user) {
    throw "User Does not exist";
  }

  
if(!(params.user_logintype == "guestlogin")){
  if (params.user_mail) {
    const emailChanged = params.user_mail && user.user_mail !== params.user_mail;
    if (emailChanged && await db.UserDetails.findOne({ where: { user_mail: params.user_mail } })) {
        throw 'email ' + params.user_mail + ' is already taken';
    }
  }
}

  if (params.user_password) {
    params.user_password = await bcrypt.hash(params.user_password, 10);
  }
  Object.assign(user, params);
    return await user.save();
}

function update(req, res, next) {
  console.log("POST /updateUserDetails API call made ");
  updateUserDetails(req.body)
    .then((user) => res.json(user))
    .catch(next);
}



async function getAllUserDetail() {
  const allUsers = await db.UserDetails.findAll({
    attributes: { exclude: ["user_password"] },
  });
  return allUsers;
}
function getAllUserDetails(req, res, next) {
  console.log("GET /getAllUserDetails API call made ");
  getAllUserDetail()
    .then((users) => res.json(users))
    .catch(next);
}

async function getUserDetail(params){
  const userDetail = await db.UserDetails.findOne({
    where: { user_id: params.id },
  });
  if(!userDetail){
    throw "User Details not found";
  }
  return userDetail;
}

function getUserDetails(req,res,next){
  console.log("GET /getUserDetails ApI call");
  getUserDetail(req.params).then((users)=>res.json(users))
  .catch(next);
}

// async function getUser(id) {
//   const user = await db.User.findByPk(id);
//   if (!user) throw "User not found";
//   return user;
// }

