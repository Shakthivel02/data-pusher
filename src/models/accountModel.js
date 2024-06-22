const db = require("../utils/db")
const { v4: uuidv4 } = require("uuid")

class Account {
  static create(data, callback) {
    const secretToken = uuidv4()
    const { email, accountName, website } = data
    const query =
      "INSERT INTO accounts (email, accountName, appSecretToken, website) VALUES (?, ?, ?, ?)"
    db.run(query, [email, accountName, secretToken, website], function (err) {
      callback(err, this ? this.lastID : null)
    })
  }

  static findById(id, callback) {
    const query = "SELECT * FROM accounts WHERE accountId = ?"
    db.get(query, [id], (err, row) => {
      callback(err, row)
    })
  }

  static findAll(callback) {
    const query = "SELECT * FROM accounts"
    db.all(query, (err, rows) => {
      callback(err, rows)
    })
  }

  static findByAppSecretToken(secretToken) {
    return new Promise((resolve, reject) => {
      console.log(`Searching for account with secret token: ${secretToken}`)
      db.get(
        "SELECT * FROM accounts WHERE appSecretToken = ?",
        [secretToken],
        (err, row) => {
          if (err) {
            console.error("Database error:", err)
            return reject(err)
          }
          if (!row) {
            console.log("No account found with the provided secret token.")
          }
          resolve(row)
        }
      )
    })
  }

  static update(id, data, callback) {
    const { email, accountName, website } = data
    const query =
      "UPDATE accounts SET email = ?, accountName = ?, website = ? WHERE accountId = ?"
    db.run(query, [email, accountName, website, id], function (err) {
      callback(err, this ? this.changes : null)
    })
  }

  static delete(id, callback) {
    const query = "DELETE FROM accounts WHERE accountId = ?"
    db.run(query, [id], function (err) {
      callback(err, this ? this.changes : null)
    })
  }
}

module.exports = Account
