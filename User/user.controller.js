const db = require('../helpers/db');
const express = require('express');
const router = express.Router();
const Joi = require('joi');
const validateRequest = require('../middleware/validate-request');


router.post('/register', registerSchema, register);
router.post('/update', updateSchema, updateUser);

module.exports = router;

function registerSchema(req, res, next) {
    const schema = Joi.object({
        username: Joi.string().required().trim(),
        gems: Joi.number().required(),
        fb_username: Joi.string(),
        email: Joi.string()

    });
    validateRequest(req, next, schema);
}


async function create(params) {
    params.username = params.username.trim()
    if (await db.User.findOne({ where: { username: params.username } })) {
        throw 'username "' + params.username + '" is already taken';
    }

    const user = await db.User.create(params);
    // const { updatedAt, createdAt, ...newUser } = user;
    return user;
}

function register(req, res, next) {
    create(req.body)
        .then((user) => res.json(user))
        .catch(next);
}

function updateSchema(req, res, next) {
    const schema = Joi.object({
        id: Joi.number().required(),
        username: Joi.string().empty('').trim()
    });
    validateRequest(req, next, schema);
}

function updateUser(req, res, next) {
    update(req.body)
        .then((user) => res.json(user))
        .catch(next);
}
async function update(params) {
    params.username = params.username.trim()
    const user = await getUser(params.id);

    const usernameChanged = params.username && user.username !== params.username;
    if (usernameChanged && await db.User.findOne({ where: { username: params.username } })) {
        throw 'username "' + params.username + '" is already taken';
    }

    // copy params to manager and save
    Object.assign(user, params);
    return await user.save();
}
async function getUser(id) {

    const user = await db.User.findByPk(id);
    if (!user) throw 'User not found';
    return user;
}
