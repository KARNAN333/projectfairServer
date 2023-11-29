const jwt = require('jsonwebtoken')

const jwtMiddleware = (req, res, next) => {
    console.log("inside jwtMiddleware");
    const token = req.headers['authorization'].split(" ")[1]
    // console.log(token);
    try {
        const jwtResponse = jwt.verify(token, "sepersecretkey12345")
        console.log(jwtResponse);
        req.payload = jwtResponse.userId
        next()
    }
    catch (err) {
        res.status(401).json("authorization failed... please login...")
    }
}

module.exports = jwtMiddleware