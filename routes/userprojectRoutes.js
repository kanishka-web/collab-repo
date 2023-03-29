const express = require('express')
const mongoose = require('mongoose')

const UserProject = require('../models/userProjects');

const router = express.Router();

router.get("/", (req, res) => {
    UserProject.find()
    .then((result) => {
        res.send(result);
    })
    .catch((err) => {
        console.log(err);
    });
})

router.get("/:id", (req, res) => {
    const id = req.params.id;
    UserProject.findById(id)
    .then((result) => {
        res.send(result);
    })
    .catch((err) => {
        console.log(err);
    });
})

router.get("/user/:id", (req, res) => {
    const id = req.params.id;
    UserProject.find({userId: id})
    .then((result) => {
        res.send(result);
    })
    .catch((err) => {
        console.log(err);
    });
})

router.post("/", (req, res) => {
    const userProject = new UserProject({
        userId: req.body.userId,
        projectId: req.body.projectId,
        currentStatus: req.body.currentStatus
    })

    userProject.save()
    .then((result) => {
        res.send(result);
    })
    .catch((err) => {
        console.log(err);
    });

})

router.delete('/:id', (req, res) => {
    const id = req.params.id;
    UserProject.findByIdAndDelete(id)
    .then((result) => {
        res.send(result);
    })
    .catch((err) => {
        console.log(err);
    });
})

router.put("/:id", (req, res) => {
    const id = req.params.id;
    const userProject = {
        userId: req.body.userId,
        projectId: req.body.projectId,
        currentStatus: req.body.currentStatus
    }

    UserProject.findByIdAndUpdate(id, userProject)
    .then((result) => {
        UserProject.findById(id).then((updated) => {
            res.send(updated);
        });
    })
    .catch((err) => {
        console.log(err);
    });
})

module.exports = router;
