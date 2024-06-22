const db = require("../utils/db")

class ReceiveData {
  static create(request, callback) {
    const { accountId, dataToSend } = request
    const query = "INSERT INTO receive_data (accountId, data) VALUES (?, ?)"
    db.run(query, [accountId, JSON.stringify(dataToSend.data)], function (err) {
      callback(err, this ? this.lastID : null)
    })
  }

  static findAll(callback) {
    const query = "SELECT * FROM receive_data"
    db.all(query, (err, rows) => {
      callback(err, rows)
    })
  }
}

module.exports = ReceiveData
