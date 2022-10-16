# maxis-interview-assignment
Assignment to be fulfilled as per interviewer's request

1. GET/POST API to accept email and number of offers.
2. System generate offer by query random offer from offer table based on number of offers.
3. Insert the offer into transaction table to record the email taken which offers.
4. API response the offer.
5. Error handling
    * API return error if any error from database transaction.
    * Cache the API response.
    * Apply ACID transaction design.

## How to run
1. clone repository
2. Setup redis locally (use default port and host)
3. Run in terminal of cloned repository "npm run start"
3. Server should be available on http://localhost:8000
3. Memory database is used for demonstration purposes so all queries must be ran to keep database values alive.

## Endpoints
1. POST "/offers" - Creating offers. Example: {"offerName" :"cash", "elgibileFor" : "users" } in request body
2. GET "/user-offers" - Generating offers for a user. Example: /user-offers?email=ronaldo@gmail.com&count=2
3. GET "/offers" - Viewing available offers.
4. GET "/transactions" - Viewing transactions of users (response is cached). Example: /transactions?email=ronaldo@gmail.com&count=3

## ACID application
Atomicity: Finding offers, creating transactions and deleting offers are all performed at once. Found in models/offers.js
Consistency: The total number of offers and transactions stay the same after the user-offer request. Found in models/offers.js
Isolation: Finding offers, creating transactions and deleting offers are all invisible to each other. Found in models/offers.js

## Caching
Strategy:
Caching is done on retrieval of offers for a user from the transaction table. Found in models/transactions.js
Cache for a particular query is invalidated when offers are generated for that query. Found in helpers/offers.js