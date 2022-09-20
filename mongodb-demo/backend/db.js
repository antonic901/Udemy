const { MongoClient, ServerApiVersion } = require('mongodb');

const uri = "mongodb+srv://nikola:kinzo@cluster0.lrmmckp.mongodb.net/shop?retryWrites=true&w=majority";
const mongoClient = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

let _db;

const initDb = callback => {
    if (_db) {
        console.log('Database is already initialized!');
        return callback(null, _db);
    }
    mongoClient.connect().then(client => {
        _db = client.db();
        return callback(null, _db);
    }).catch(err => {
        callback(err);
    });
}

const getDb = () => {
    if(!_db) {
        throw Error('Database not initialized!');
    }
    return _db;
}

module.exports = {
    initDb,
    getDb
}