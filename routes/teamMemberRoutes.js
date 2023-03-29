const express = require('express')
const mongoose = require('mongoose')
const TeamMember = require('../models/teamMembers');

const router = express.Router();

router.get("/", (req, res) => {
    TeamMember.find()
    .then((result) => {
        res.send(result);
    })
    .catch((err) => {
        console.log(err);
    });
})

router.get("/:id", (req, res) => {
    const id = req.params.id;
    TeamMember.findById(id)
    .then((result) => {
        res.send(result);
    })
    .catch((err) => {
        console.log(err);
    });
})

router.post("/", (req, res) => {
    const teamMember = new TeamMember({
        teamId: req.body.teamId,
        userId: req.body.userId
    })

    teamMember.save()
    .then((result) => {
        res.send(result);
    })
    .catch((err) => {
        console.log(err);
    });

})

router.delete('/:id', (req, res) => {
    const id = req.params.id;
    TeamMember.findByIdAndDelete(id)
    .then((result) => {
        res.send(result);
    })
    .catch((err) => {
        console.log(err);
    });
})

router.put("/:id", (req, res) => {
    const id = req.params.id;
    const teamMember = {
        teamId: req.body.teamId,
        userId: req.body.userId
    }

    TeamMember.findByIdAndUpdate(id, teamMember)
    .then((result) => {
        TeamMember.findById(id).then((updated) => {
            res.send(updated);
        });
    })
    .catch((err) => {
        console.log(err);
    });
})

module.exports = router;