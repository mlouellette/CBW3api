function isAuth(req, res, next) {
    const auth = req.headers.authorization;
    if (auth === 'password') {
      next();
    } else {
      res.status(401);
      res.send('Access forbidden');
    }
}

const jwt = require('jsonwebtoken');

const authenticateJWT = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (authHeader) {
        const token = authHeader.split(' ')[1];

        jwt.verify(token, accessTokenSecret, (err, user) => {
            if (err) {
                return res.sendStatus(403);
            }

            req.user = user;
            next();
        });
    } else {
        res.sendStatus(401);
    }
};

module.exports = { isAuth, authenticateJWT }