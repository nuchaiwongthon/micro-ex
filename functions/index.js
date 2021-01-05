const functions = require('firebase-functions');
const express = require('express')
const cors = require('cors');
const bodyParser = require('body-parser');

// // // Create and Deploy Your First Cloud Functions
// // // https://firebase.google.com/docs/functions/write-firebase-functions
// //
// // exports.helloWorld = functions.https.onRequest((request, response) => {
// //   functions.logger.info("Hello logs!", {structuredData: true});
// //   response.send("Hello from Firebase!");
// // });

// const app = express()
// // Automatically allow cross-origin requests
// app.use(cors({ origin: true }));

// // parse body params and attache them to req.body
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));


// app.get('/', (req, res) => {
//     console.log('Request from Firebase');
//     res.send('Hello World! This is from express')
// })


const mongo = require('./config/mongodb')();
const app = require('./config/express')();
const port = require('./config/port').STAFF;

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
exports.api = functions.region('asia-southeast2').https.onRequest(app);




