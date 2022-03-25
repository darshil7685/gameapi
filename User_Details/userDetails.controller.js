const db = require("../helpers/db");
const express = require("express");
const router = express.Router();
const Joi = require("joi");
const bcrypt = require("bcryptjs");
const validateRequest = require("../middleware/validate-request");

router.post("/registerUserDetails", registerSchema, register);
router.get("/getAllUserDetails",getAllUserDetails);

module.exports = router;

function registerSchema(req, res, next) {
  const schema = Joi.object({
    user_id: Joi.number().required(),
    user_mail:Joi.string(),
    user_name: Joi.string().trim(),
    user_password: Joi.string(),
    user_logintype: Joi.string().required(),
    user_isActive: Joi.boolean(),
    user_amount: Joi.number(),
    user_debit_amount: Joi.number(),
  });
  validateRequest(req, next, schema);
}

async function create(params) {

const duplicateUserId=await db.UserDetails.findOne({ where: {user_id: params.user_id } })
if(duplicateUserId){
    throw 'Used Id '+params.user_id+' is already taken'
}

if (params.user_name) {
  params.user_name = params.user_name.trim();
    const duplicateUserName=await db.UserDetails.findOne({ where: { user_name: params.user_name } })
    if(duplicateUserName)
   {
    throw 'username " + params.user_name + " is already taken';
  }
}

if(params.user_mail){
const duplicateMailId = await db.UserDetails.findOne({where:{user_mail:params.user_mail}})
if(duplicateMailId){
  throw 'Mail Id '+params.user_mail+' is alreadytaken'
}
}

 

  if (params.user_password) {
    params.user_password = await bcrypt.hash(params.user_password, 10);
  }
  const user = await db.UserDetails.create(params);
  // const { updatedAt, createdAt, ...newUser } = user;
  return user;
}

function register(req, res, next) {
  create(req.body)
    .then((user) => res.json(user))
    .catch(next);
}

async function getUser(id) {
  const user = await db.User.findByPk(id);
  if (!user) throw "User not found";
  return user;
}


async function getAllUserDetail(){
  const allUsers =await  db.UserDetails.findAll({attributes:{exclude:['user_password']}});
  return allUsers;
}
function getAllUserDetails(req,res,next){
  getAllUserDetail()
  .then((users)=>res.json(users))
  .catch(next);
}