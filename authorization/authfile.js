const jwt = require("jsonwebtoken")
module.exports = (req, res, next) => {

    const authHeader = req.headers.authorization;
    if (authHeader) {
        const token = authHeader.split(' ')[1];
        token_created = token.slice(4, token.length - 1)
        console.log(token_created)
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