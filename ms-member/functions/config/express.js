process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = 1;
const express = require('express');
const bodyParser = require('body-parser');

module.exports = () => {
    const app = express();
    app.use((req, res, next) => {
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Methods', 'GET,POST,PUT');
        res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
        app.locals.pretty = true;
        return next();
    });
    app.use(bodyParser.urlencoded({
        extended: true,
        limit: '100mb'
    }));
    app.use(bodyParser.json({
        limit: '100mb'
    }));
    require('../app/routes/member.route')(app);
    return app;
}
