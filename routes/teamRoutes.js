const express = require('express')
const mongoose = require('mongoose')
const Team = require('../models/teams');

const router = express.Router();

router.get("/", (req, res) => {
    Team.find()
    .then((result) => {
        res.send(result);
    })
    .catch((err) => {
        console.log(err);
    });
})

router.get("/:id", (req, res) => {
    const id = req.params.id;
    Team.findById(id)
    .then((result) => {
        res.send(result);
    })
    .catch((err) => {
        console.log(err);
    });
})

router.post("/", (req, res) => {
    const team = new Team({
        managerId: req.body.managerId,
        projectId: req.body.projectId
    })

    team.save()
    .then((result) => {
        res.send(result);
    })
    .catch((err) => {
        console.log(err);
    });

})

router.delete('/:id', (req, res) => {
    const id = req.params.id;
    Team.findByIdAndDelete(id)
    .then((result) => {
        res.send(result);
    })
    .catch((err) => {
        console.log(err);
    });
})

router.put("/:id", (req, res) => {
    const id = req.params.id;
    const team = {
        managerId: req.body.managerId,
        projectId: req.body.projectId
    }

    Team.findByIdAndUpdate(id, team)
    .then((result) => {
        Team.findById(id).then((updated) => {
            res.send(updated);
        });
    })
    .catch((err) => {
        console.log(err);
    });
})

module.exports = router;