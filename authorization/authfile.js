const jwt = require("jsonwebtoken")
module.exports = (req, res, next) => {
    // console.log(req)
    const authHeader = req.headers.cookie;
    // console.log(authHeader)
    if (authHeader) {
        const token = authHeader.split(' ')[0];
        // console.log(token);
        token_created = token.slice(4, token.length - 0)
        // console.log(token_created)
        jwt.verify(token_created, "SecretKey", (err, user) => {
            if (err) {
                // res.sendStatus(404);
                res.send("not verified")
            }
            else {
                req.user = user;
                console.log("user is right")
                next()
            };
        });
    } else {
        res.sendStatus(401);

    }
}