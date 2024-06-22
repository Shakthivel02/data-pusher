const db = require("../utils/db")

class Destination {
  static async create(data, callback) {
    try {
      const { account_id, url, http_method, headers } = data

      // Check if the account exists
      const accountExists = await new Promise((resolve, reject) => {
        const query =
          "SELECT COUNT(*) AS count FROM accounts WHERE accountId = ?"
        db.get(query, [account_id], (err, row) => {
          if (err) return reject(err)
          resolve(row.count > 0)
        })
      })

      if (!accountExists) {
        return callback(new Error("Account does not exist"), null)
      }

      // Insert the destination if the account exists
      const query =
        "INSERT INTO destinations (accountId, url, http_method, headers) VALUES (?, ?, ?, ?)"
      db.run(
        query,
        [account_id, url, http_method, JSON.stringify(headers)],
        function (err) {
          callback(err, this ? this.lastID : null)
        }
      )
    } catch (error) {
      callback(error, null)
    }
  }

  static findById(id, callback) {
    const query = "SELECT * FROM destinations WHERE id = ?"
    db.get(query, [id], (err, row) => {
      callback(err, row)
    })
  }

  static update(id, data, callback) {
    const { url, http_method, headers } = data
    const query =
      "UPDATE destinations SET url = ?, http_method = ?, headers = ? WHERE id = ?"
    db.run(
      query,
      [url, http_method, JSON.stringify(headers), id],
      function (err) {
        callback(err, this ? this.changes : null)
      }
    )
  }

  static delete(id, callback) {
    const query = "DELETE FROM destinations WHERE id = ?"
    db.run(query, [id], function (err) {
      callback(err, this ? this.changes : null)
    })
  }

  static findByAccountId(accountId, callback) {
    const query = "SELECT * FROM destinations WHERE accountId = ?"
    db.all(query, [accountId], (err, rows) => {
      callback(err, rows)
    })
  }

  static asyfindByAccountId(accountId) {
    return new Promise((resolve, reject) => {
      const query = "SELECT * FROM destinations WHERE accountId = ?"
      db.all(query, [accountId], (err, rows) => {
        if (err) {
          return reject(err)
        }
        resolve(rows || []) // Ensure it resolves with an array
      })
    })
  }
}

module.exports = Destination
