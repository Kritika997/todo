const jwt = require("jsonwebtoken")
module.exports = (req, res, next) => {
    const authHeader = req.headers.cookie;
    if (authHeader) {
        const token = authHeader.split(' ')[0];
        sliceToken = token.slice(4, token.length - 0)
        jwt.verify(sliceToken, "SecretKey", (err, user) => {
            if (err) {
                // res.send(404);
                res.send("not verified")
            }
            else {
                req.user = user;
                console.log(user)
                // res.send("user is right")
                next()
            };
        });
    } else {
        res.send("Token Invalid")
    };
};



