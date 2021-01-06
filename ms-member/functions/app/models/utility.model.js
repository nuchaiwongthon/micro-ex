let mongo = require('../../config/mongodb');
module.exports = {
  insert_one: async (collection, data, option) => {
    return new Promise(async (resolve, reject) => {
      mongo.db.collection(collection).insertOne(data, option || {}, (err, res) => {
        !err ? resolve(res) : reject(err);
      });
    });
  },
  insert_many: (collection, data, option) => {
    return new Promise(((resolve, reject) => {
      mongo.db.collection(collection).insertMany(data, option || {}, (err, res) => {
        if (!err) resolve(res);
        err && err.code === 11000 && option && option.ordered === false ? resolve(res) : reject(err);
      });
    }));
  },
  update_one: (collection, query, set, option) => {
    return new Promise(((resolve, reject) => {
      mongo.db.collection(collection).updateOne(query, set, option || {}, (err, res) => {
        !err ? resolve(res) : reject(err);
      });
    }));
  },
  update_many: (collection, query, set, option) => {
    return new Promise(((resolve, reject) => {
      mongo.db.collection(collection).updateMany(query, set, option || {}, (err, res) => {
        !err ? resolve(res) : reject(err);
      });
    }));
  },
  delete_one: (collection, query, option) => {
    return new Promise(((resolve, reject) => {
      mongo.db.collection(collection).deleteOne(query, option || {}, (err, res) => {
        !err ? resolve(res) : reject(err);
      });
    }));
  },
  delete_many: (collection, query, option) => {
    return new Promise(((resolve, reject) => {
      mongo.db.collection(collection).deleteMany(query, option || {}, (err, res) => {
        !err ? resolve(res) : reject(err);
      });
    }));
  },
  aggregate: (collection, query, option) => {
    return new Promise(((resolve, reject) => {
      mongo.db
        .collection(collection)
        .aggregate(query, option || {})
        .toArray((err, res) => {
          !err ? resolve(res) : reject(err);
        });
    }));
  },
  count: (collection, query) => {
    return new Promise(((resolve, reject) => {
      mongo.db.collection(collection).estimatedDocumentCount(query, (err, res) => {
        !err ? resolve(res) : reject(err);
      });
    }));
  },
};
