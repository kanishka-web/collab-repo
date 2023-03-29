const express = require('express')
const mongoose = require('mongoose')
const WeeklyEntry = require('../models/weeklyEntry');

const router = express.Router();

router.get("/", (req, res) => {
    WeeklyEntry.find()
    .then((result) => {
        res.send(result);
    })
    .catch((err) => {
        console.log(err);
    });
})

router.get("/:id", (req, res) => {
    const id = req.params.id;
    WeeklyEntry.findById(id)
    .then((result) => {
        res.send(result);
    })
    .catch((err) => {
        console.log(err);
    });
})

router.post("/", (req, res) => {
    const weeklyEntry = new WeeklyEntry({
        weeklyDataId: req.body.weeklyDataId,
        projectId: req.body.projectId,
        planned: req.body.planned,
        actual: req.body.actual
    })

    weeklyEntry.save()
    .then((result) => {
        res.send(result);
    })
    .catch((err) => {
        console.log(err);
    });

})

router.delete('/:id', (req, res) => {
    const id = req.params.id;
    WeeklyEntry.findByIdAndDelete(id)
    .then((result) => {
        res.send(result);
    })
    .catch((err) => {
        console.log(err);
    });
})

router.put("/:id", (req, res) => {
    const id = req.params.id;
    const weeklyEntry = {
        weeklyDataId: req.body.weeklyDataId,
        projectId: req.body.projectId,
        planned: req.body.planned,
        actual: req.body.actual
    }

    WeeklyEntry.findByIdAndUpdate(id, weeklyEntry)
    .then((result) => {
        WeeklyEntry.findById(id).then((updated) => {
            res.send(updated);
        });
    })
    .catch((err) => {
        console.log(err);
    });
})

module.exports = router;