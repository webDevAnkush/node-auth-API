
const express = require('express');
const jwt = require('jsonwebtoken');

var app = express();

// Check app is running
app.get('/api', (req, res) => {
    res.json({ "message": "Welcome to node API, to access all API's you must login using username and password!" });
});

// Create post
app.post("/api/posts", verifyToken, (req, res) => {
    jwt.verify(req.token, "12345", (err, authData) => {
        if (err) {
            res.sendStatus(403);
        }
        else {
            res.json({
                message: "Post created",
                authData
            })
        }

    })
});

// Login
app.post("/api/login", (req, res) => {
    // Mock user
    // Check user is valid with DB
    const user = {
        id: "1",
        username: "webdevankush",
        email: "webdevankush@gmail.com"
    }

    const token = jwt.sign(user, "12345", (err, token) => {

        if (err) {
            res.json({ "error": error });
        }

        res.json({ token: token });
    });

});

// Format token
// authorization: Bearer <access_token>
// Verify token
function verifyToken(req, res, next) {
    const bearerHeader = req.headers['authorization'];
    // Check token is not undefined
    if (typeof bearerHeader !== "undefined") {
        // Get bearer token
        const bearer = bearerHeader.split(' ');
        const bearerToken = bearer[1];
        req.token = bearerToken;
        next();
    }
    else {
        res.sendStatus(403);
    }
}

app.listen(3000, () => {
    console.log("App started and listening on Port : 3000");
})