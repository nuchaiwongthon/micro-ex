const functions = require('firebase-functions');

const mongo = require('./config/mongodb')();
const app = require('./config/express')();
const port = require('./config/port').STAFF;

const runtimeOpts = {
    timeoutSeconds: 300,
    memory: '512MB'
}
const start = async () => {
    await mongo.catch((e) => {
        throw e;
    });
    app.listen(port);
    module.exports = app;
    console.log('server running at port : ' + port);
}
start();
// Expose Express API as a single Cloud Function:
exports.staff = functions.runWith(runtimeOpts).region('asia-southeast2').https.onRequest(app);




