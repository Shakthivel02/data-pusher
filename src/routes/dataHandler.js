const express = require("express")
const router = express.Router()
const sendData = require("../utils/sendData") // Adjust path as per your project structure
const Account = require("../models/accountModel") // Adjust path as per your project structure

// POST /server/incoming_data - Receive and handle incoming data
router.post("/incoming_data", async (req, res, next) => {
  try {
    console.log("Incoming request received")

    // Validate Content-Type
    if (!req.is("application/json")) {
      console.log("Invalid Content-Type")
      return res.status(400).json({ message: "Invalid Data" })
    }

    const secretToken = req.headers["cl-x-token"]
    if (!secretToken) {
      console.log("Missing secret token")
      return res.status(401).json({ message: "Invalid Token" })
    }

    console.log(`Received request with secret token: ${secretToken}`)

    // Find account by secret token
    const account = await Account.findByAppSecretToken(secretToken)
    if (!account) {
      console.log("Unauthenticated request")
      return res.status(404).json({ message: "Unauthenticated" })
    }

    console.log("Authenticated account:", account)

    // Assuming req.body contains the data to be sent
    const dataToSend = req.body
    console.log(
      `Sending data to destinations for account ID: ${account.accountId}`
    )

    // Use sendData function to send data to destinations
    await sendData(account.accountId, dataToSend)
    //console.log("Data sent successfully")
    res.json({ message: "Data sent to destinations successfully" })
  } catch (error) {
    console.error("Error handling incoming data:", error.message)
    res.status(500).json({ message: "Internal Server Error" })
  }
})

module.exports = router
