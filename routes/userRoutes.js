const express = require('express')
const mongoose = require('mongoose')
const User = require('../models/users');

const router = express.Router();

router.get("/", (req, res) => {
    User.find()
    .then((result) => {
        res.send(result);
    })
    .catch((err) => {
        console.log(err);
    });
})

router.get("/:id", (req, res) => {
    const id = req.params.id;
    User.findById(id)
    .then((result) => {
        res.send(result);
    })
    .catch((err) => {
        console.log(err);
    });
})

router.post("/", (req, res) => {
    const user = new User({
        name: req.body.name,
        role: req.body.role,
        managerId: req.body.managerId,
        email: req.body.email,
        currentStatus: req.body.currentStatus
    })

    user.save()
    .then((result) => {
        res.send(result);
    })
    .catch((err) => {
        console.log(err);
    });

})

router.delete('/:id', (req, res) => {
    const id = req.params.id;
    User.findByIdAndDelete(id)
    .then((result) => {
        res.send(result);
    })
    .catch((err) => {
        console.log(err);
    });
})

router.put("/:id", (req, res) => {
    const id = req.params.id;
    const user = {
        name: req.body.name,
        role: req.body.role,
        managerId: req.body.managerId,
        email: req.body.email,
        currentStatus: req.body.currentStatus
    }

    User.findByIdAndUpdate(id, user)
    .then((result) => {
        User.findById(id).then((updated) => {
            res.send(updated);
        });
    })
    .catch((err) => {
        console.log(err);
    });
})

module.exports = router;
