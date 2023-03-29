const express = require('express')
const mongoose = require('mongoose')
const Project = require('../models/projects');

const router = express.Router();

router.get("/", (req, res) => {
    Project.find()
    .then((result) => {
        res.send(result);
    })
    .catch((err) => {
        console.log(err);
    });
})

router.get("/:id", (req, res) => {
    const id = req.params.id;
    Project.findById(id)
    .then((result) => {
        res.send(result);
    })
    .catch((err) => {
        console.log(err);
    });
})

router.post("/", (req, res) => {
    const project = new Project({
        name: req.body.name,
        createdBy: req.body.createdBy,
        currentStatus: req.body.currentStatus
    })

    project.save()
    .then((result) => {
        res.send(result);
    })
    .catch((err) => {
        console.log(err);
    });

})

router.delete('/:id', (req, res) => {
    const id = req.params.id;
    Project.findByIdAndDelete(id)
    .then((result) => {
        res.send(result);
    })
    .catch((err) => {
        console.log(err);
    });
})

router.put("/:id", (req, res) => {
    const id = req.params.id;
    const project = {
        name: req.body.name,
        createdBy: req.body.createdBy,
        currentStatus: req.body.currentStatus
    }

    Project.findByIdAndUpdate(id, project)
    .then((result) => {
        Project.findById(id).then((updated) => {
            res.send(updated);
        });
    })
    .catch((err) => {
        console.log(err);
    });
})

module.exports = router;
