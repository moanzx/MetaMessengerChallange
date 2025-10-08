# Quick Start
1. Clone the repo and install:
   ```
   git clone https://github.com/moanzx/MetaMessengerChallange
   // Open visual studio at the root MetaMessengerChallange directory or cd to there
   npm install // To download dependencies
   ```

2. Create .env file with the following:
   ```
   PORT=3000
   MONGO_URI=mongodb://localhost:27017/MetaMessengerChallange
   JWT_SECRET=65a1e7d752dc14f77cdc9...   # use your own secret
   ```
   Use what port you want just make sure to include it in the request's url
   For the mongo Uri use a database you created (replace MetaMessengerChallange name if different name)
   For the JWT_SECRET it can be whatever string you want

3. Running the server
    ```
    npm run dev
    ```

# Basic Notes
1. Mongo DB is the community local edition, make sure to use that and that its on
2. JWT token expire in the hour and each login refreshed it, but also make sure to paste them to the rest of the requests
3. I added .rest file for easy use of the requests, just make sure to swith the JWT after the Bearer, can be used with the rest client extention in VS code easily (instead of postman)

# Routes
1. System
    ```
    GET http://localhost:3000/ping
    ```
    Quick health check. Returns { ok: true } if the server is running.

2. Authentication
    ```
    POST http://localhost:3000/api/auth/register
    Content-Type: application/json

    {
        "username": "PersonA",
        "password": "testA"

    }
    ```
    Creates the new user in the mongoDB with hashed password

    ```
    POST http://localhost:3000/api/auth/login
    Content-Type: application/json

    {
        "username": "PersonA",
        "password": "testA"
    }
    ```
    Logs in the user, return the JWT token which you mush use in the next API calls, switch the current JWT token which is after the Bearer with the result you got for this one, expires in 1 hour, can be change in auth.service.ts if you want to shorten the expiring time to test it.

3. Chat
    ```
    POST http://localhost:3000/api/chat/send
    Content-Type: application/json
    Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2OGUzNmE1OTVmM2FiMzI3MTdmN2I0ZGYiLCJ1c2VybmFtZSI6IlBlcnNvbkEiLCJpYXQiOjE3NTk3MzQzODksImV4cCI6MTc1OTczNzk4OX0.Fdt1_5ZJ7Ouy9DcxWu-dM-xS9i2pSyP68DK-1Ytcl6s

    {
        "recipientIdentifier": "PersonB",
        "content": "Hello, how are you 1?"
    }
    ```
    Protected with JWT token, Server looks up recipientIdentifier (username) and stores the message with the real recipientId. The server ignores any senderId from the client and uses the JWT’s user id as the sender. Content is sanitized and validated.

4. History
    ```
    GET http://localhost:3000/api/history
    Content-Type: application/json
    Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2OGUzNmE1OTVmM2FiMzI3MTdmN2I0ZGYiLCJ1c2VybmFtZSI6IlBlcnNvbkEiLCJpYXQiOjE3NTk3NjI0MjAsImV4cCI6MTc1OTc2NjAyMH0.1MNRDt57vt33IBO3uJHDYIjlT5tKM5rSRSe66wByQeY
    ```
    Protected with JWT token, Returns the last sent or recieved messages from every single user that interacted with the the user that sends the request (identified from the JWT), using queries that use the indexing in mongoDB

    ```
    GET http://localhost:3000/api/history/cached
    Content-Type: application/json
    Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2OGUzNmE1OTVmM2FiMzI3MTdmN2I0ZGYiLCJ1c2VybmFtZSI6IlBlcnNvbkEiLCJpYXQiOjE3NTk3MzQzODksImV4cCI6MTc1OTczNzk4OX0.Fdt1_5ZJ7Ouy9DcxWu-dM-xS9i2pSyP68DK-1Ytcl6s
    ```
    Same functionallity as before, but i had another idea which i though worth implementing, using another collection called LastMessages, i only save the last message between a pair of users, making to retrieving of the last messages faster when there are many messages