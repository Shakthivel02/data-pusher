const express = require("express")
const router = express.Router()
const Destination = require("../models/destinationModel")

router.post("/", (req, res, next) => {
  Destination.create(req.body, (err, id) => {
    if (err) return next(err)
    res.status(201).json({ id, message: "Destination successfully created" })
  })
})

router.get("/:id", (req, res, next) => {
  Destination.findById(req.params.id, (err, destination) => {
    if (err) return next(err)
    if (!destination)
      return res.status(404).json({ message: "Destination not found" })
    res.json(destination)
  })
})

router.put("/:id", (req, res, next) => {
  Destination.update(req.params.id, req.body, (err, changes) => {
    if (err) return next(err)
    if (changes === 0)
      return res.status(404).json({ message: "Destination not found" })
    res.json({ message: "Destination updated" })
  })
})

router.delete("/:id", (req, res, next) => {
  Destination.delete(req.params.id, (err, changes) => {
    if (err) return next(err)
    if (changes === 0)
      return res.status(404).json({ message: "Destination not found" })
    res.json({ message: "Destination deleted" })
  })
})

router.get("/account/:accountId", (req, res, next) => {
  Destination.findByAccountId(req.params.accountId, (err, destinations) => {
    if (err) return next(err)
    if (!destinations)
      return res.status(404).json({ message: "Destination not found" })
    res.json(destinations)
  })
})

module.exports = router
