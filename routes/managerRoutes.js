const express = require('express')
const mongoose = require('mongoose')
const User = require('../models/users');

const router = express.Router();

router.get("/", (req, res) => {
    User.find({role: "Manager"})
    .then((result) => {
        res.send(result);
    })
    .catch((err) => { 
        console.log(err);
    });
})

router.get("/:id", (req, res) => {
    const id = req.params.id;
    User.find({role: "Manager", _id: id})
    .then((result) => {
        res.send(result);
    })
    .catch((err) => {
        console.log(err);
    });
})

module.exports = router;
