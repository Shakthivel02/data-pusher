-- Define schema for accounts table
CREATE TABLE IF NOT EXISTS accounts (
    accountId INTEGER PRIMARY KEY AUTOINCREMENT,
    email TEXT UNIQUE NOT NULL,
    accountName TEXT NOT NULL,
    appSecretToken TEXT DEFAULT (hex(randomblob(16))),
    website TEXT
);

-- Define schema for destinations table
CREATE TABLE IF NOT EXISTS destinations (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    accountId TEXT NOT NULL,
    url TEXT NOT NULL,
    http_method TEXT NOT NULL,
    headers TEXT NOT NULL,
    FOREIGN KEY (accountId) REFERENCES accounts(accountId) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS receive_data (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    accountId INTEGER NOT NULL,
    data TEXT NOT NULL,
    receivedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (accountId) REFERENCES accounts(accountId) ON DELETE CASCADE
);



