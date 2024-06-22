const axios = require("axios")
const Destination = require("../models/destinationModel")
require("dotenv").config()

async function sendData(accountId, dataToSend) {
  try {
    const baseURL = process.env.BASE_URL

    // Fetch destinations for the given account
    const destinations = await Destination.asyfindByAccountId(accountId)

    if (!destinations || destinations.length === 0) {
      console.log("No destinations found for the account")
      return
    }

    console.log("Destinations found:", destinations)

    // Iterate over each destination and send data
    const sendRequests = destinations.map(async (destination) => {
      const url = destination.url
      const method = destination.http_method
      const headers = JSON.parse(destination.headers) // Ensure headers are parsed correctly
      const acc_id = destination.accountId

      const config = {
        baseURL: baseURL,
        method: method,
        url: url,
        headers: headers,
        data: {
          accountId: acc_id,
          dataToSend,
        },
      }

      const response = await axios(config)
      console.log(
        `Data sent to ${baseURL}/${url} with status: ${response.status}`
      )
    })

    await Promise.all(sendRequests)
    console.log("All data sent to destinations successfully")
  } catch (error) {
    console.error("Error sending data to destinations:", error.message)
    throw error // Propagate error for handling in calling function
  }
}

module.exports = sendData
