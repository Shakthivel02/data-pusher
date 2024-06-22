const sqlite3 = require("sqlite3").verbose()
const db = new sqlite3.Database(":memory:")

db.serialize(() => {
  const schema = require("fs").readFileSync("./src/utils/schema.sql").toString()
  db.exec(schema, (err) => {
    if (err) {
      console.error("Error initializing database schema:", err.message)
    } else {
      console.log("Database schema initialized successfully")
    }
  })
})

module.exports = db
