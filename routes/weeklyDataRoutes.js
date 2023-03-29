const express = require('express')
const mongoose = require('mongoose')
const WeeklyData = require('../models/weeklyData');

const router = express.Router();

router.get("/", (req, res) => {
    WeeklyData.find()
    .then((result) => {
        res.send(result);
    })
    .catch((err) => {
        console.log(err);
    });
})

router.get("/:id", (req, res) => {
    const id = req.params.id;
    WeeklyData.findById(id)
    .then((result) => {
        res.send(result);
    })
    .catch((err) => {
        console.log(err);
    });
})

router.post("/", (req, res) => {
    const weeklyData = new WeeklyData({
        userId: req.body.userId,
        teamId: req.body.teamId,
        week: req.body.week,
        year: req.body.year
    })

    weeklyData.save()
    .then((result) => {
        res.send(result);
    })
    .catch((err) => {
        console.log(err);
    });

})

router.delete('/:id', (req, res) => {
    const id = req.params.id;
    WeeklyData.findByIdAndDelete(id)
    .then((result) => {
        res.send(result);
    })
    .catch((err) => {
        console.log(err);
    });
})

router.put("/:id", (req, res) => {
    const id = req.params.id;
    const weeklyData = {
        userId: req.body.userId,
        teamId: req.body.teamId,
        week: req.body.week,
        year: req.body.year
    }

    WeeklyData.findByIdAndUpdate(id, weeklyData)
    .then((result) => {
        WeeklyData.findById(id).then((updated) => {
            res.send(updated);
        });
    })
    .catch((err) => {
        console.log(err);
    });
})

// router.post("/sendData",(req,res) = > {

// // })

module.exports = router;