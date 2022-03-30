const express = require('express');
const router = express.Router();
const Joi = require("joi");

const validateRequest = require("../middleware/validate-request");
const championService=require("./champion.services")

router.post("/addChampionDetails", addChampionDetails);
router.get("/getChampionDetails/:user_id",getChampionDetails);
router.get("/getChampionDetailsByChampionIndex/:user_id/:champion_index",getChampionDetailsByChampion_index);


function addChampionDetails(req, res, next) {
    console.log("POST /addChampionDetails api called")
    championService.addChampionDetails(req.body)
        .then(data => res.json({ message: data}))
        .catch(next)
}

function getChampionDetails(req, res, next) {
    console.log("GET /getChampionDetails api called")
    championService.getChampionDetails(req.params)
        .then(data => res.json(data))
        .catch(next)
}

function getChampionDetailsByChampion_index(req,res,next){
    console.log("GET /getchampionDetailsByChampion_index api called")
    championService.getChampionDetailsByChampion_index(req.params)
    .then(data=>res.json(data))
    .catch(next)
}


module.exports=router;