const express = require("express")
const router = express.Router()
const Account = require("../models/accountModel")
//const Destination = require("../models/destinationModel")

router.post("/", (req, res, next) => {
  Account.create(req.body, (err, id) => {
    if (err) return next(err)
    res.status(201).json({ id, message: "Account created" })
  })
})

router.get("/", (req, res, next) => {
  Account.findAll((err, accounts) => {
    if (err) return next(err)
    res.json(accounts)
  })
})

router.get("/:id", (req, res, next) => {
  Account.findById(req.params.id, (err, account) => {
    if (err) return next(err)
    if (!account) return res.status(404).json({ message: "Account not found" })
    res.json(account)
  })
})

router.put("/:id", (req, res, next) => {
  Account.update(req.params.id, req.body, (err, changes) => {
    if (err) return next(err)
    if (changes === 0)
      return res.status(404).json({ message: "Account not found" })
    res.json({ message: "Account updated" })
  })
})

router.delete("/:id", (req, res, next) => {
  Account.delete(req.params.id, (err, changes) => {
    if (err) return next(err)
    if (changes === 0)
      return res.status(404).json({ message: "Account not found" })
    res.json({ message: "Account deleted" })
  })
})

module.exports = router
