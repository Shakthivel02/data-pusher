const express = require("express")
const bodyParser = require("body-parser")
const accountRoutes = require("./src/routes/accountRoutes")
const destinationRoutes = require("./src/routes/destinationRoutes")
const errorHandler = require("./middleware/errorHandler")
const dataHandlerRoutes = require("./src/routes/dataHandler")
const receiveDataRoutes = require("./src/routes/receiveDataRoutes")
const app = express()
const port = 3000

app.use(bodyParser.json())

app.use("/accounts", accountRoutes)
app.use("/destinations", destinationRoutes)
app.use("/server", dataHandlerRoutes)
app.use("/receive_data", receiveDataRoutes)

app.use(errorHandler)

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`)
})
