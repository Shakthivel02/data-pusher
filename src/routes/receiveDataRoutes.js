const express = require("express")
const router = express.Router()
const ReceiveData = require("../models/receiveDataModel")
//const Destination = require("../models/destinationModel")

router.post("/", (req, res, next) => {
  ReceiveData.create(req.body, (err, id) => {
    console.log(req.body)
    if (err) return next(err)
    res
      .status(201)
      .json({ id, message: "Data successfully send to the destination" })
  })
})

router.get("/", (req, res, next) => {
  ReceiveData.findAll((err, received) => {
    if (err) return next(err)
    res.json(received)
  })
})

module.exports = router
