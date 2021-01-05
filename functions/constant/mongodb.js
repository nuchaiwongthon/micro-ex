const MongoClient = require('mongodb').MongoClient;
const dbConfig = require('../constants/dbCon');

module.exports.db = function (callback) {
    MongoClient.connect(dbConfig.ipConfig.ip, {
        useNewUrlParser: true, useUnifiedTopology: true
    }, (err, dbs) => {
        if (err) {
            console.log(err);
            // eslint-disable-next-line callback-return
            callback(false);
        } else {
            module.exports.db = dbs.db(dbConfig.dbName.dbGpp);
            // eslint-disable-next-line callback-return
            callback(true);
        }
    })
}