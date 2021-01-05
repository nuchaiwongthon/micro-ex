const MongoClient = require('mongodb').MongoClient;
const connection = require('../config/db-con');
module.exports = () => {
  return new Promise((resolve, reject) => {
    MongoClient.connect(connection.IP_CONFIG.DEV, { useNewUrlParser: true, useUnifiedTopology: true }, (err, dbs) => {
      !err ? resolve((module.exports.db = dbs.db(connection.DB_NAME.DB_DEV))) : reject(err);
    });
  });
};
