1.Account Endpoints:

POST /accounts: Create a new account.
GET /accounts: Get all accounts.
GET /accounts/:id: Get an account by ID.
PUT /accounts/:id: Update an account by ID.
DELETE /accounts/:id: Delete an account by ID.

POST /accounts
{
"email": "user@example.com",
"accountName": "Example Account",
"website": "https://example.com"
}

---

2.Destination Endpoints:

POST /destinations: Create a new destination.
GET /destinations/:id: Get a destination by ID.
GET /destinations/account/:id: Get a destination by AccountId.
PUT /destinations/:id: Update a destination by ID.
DELETE /destinations/:id: Delete a destination by ID.

POST /destinations
{
"account*id": 1,
"url": "/receive_data", //Whatever endpoint we want
"http_method": "POST",
"headers": {
"Content-Type": "application/json",
"Accept": "*/\_"
}
}

---

3.Data Handler Endpoint:

POST /server/incoming_data: Handle incoming data.
Requires the header CL-X-TOKEN with the app secret token.

POST /server/incoming_data
Headers: { "cl-x-token": "your_secret_token" }
data: {
"name": "example data"
"email": "Example Account"
}

---

4.Sent Data Endpoint:

GET /receive_data: Get all data
