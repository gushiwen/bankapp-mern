/** 
const { MongoClient } = require('mongodb');
const url = 'mongodb://localhost:27017';
const client = new MongoClient(url);
*/

const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = 'mongodb://localhost:27017';
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

// Database Name
const dbName = 'myProject';
let db = null;

const connectDB = async () => {
  // Use connect method to connect to the server
  await client.connect();
  console.log('Connected successfully to mongodb');
  db = client.db(dbName);
  return 'db is ready';
};

const disconnectDB = () => client.close();

connectDB()
.then(console.log)
.catch(console.error);

function verifyRole(email, role) {
    return new Promise(async (resolve, reject) => {
        try {
            const collection = db.collection('users');
            const findResult = await collection.findOne({"email": email, "role": role});
            console.log('Found document =>', findResult);
            if (findResult) resolve(true);
            else resolve(false);
        } catch (error) {
            console.log(error);
            reject(error);
        }
    });
}

function create(name, email, password, role) {
    return new Promise(async (resolve, reject) => {
        try {
            const collection = db.collection('users');
            const doc = {name, email, password, role, balance: 0};
            const insertResult = await collection.insertOne(doc);
            console.log('Inserted documents =>', insertResult);
            resolve(doc);
        } catch (error) {
            console.log(error);
            reject(error);
        }
    });
}

function find(email) {
    return new Promise(async (resolve, reject) => {
        try {
            const collection = db.collection('users');
            const findResult = await collection.findOne({"email": email});
            console.log('Found document =>', findResult);
            resolve(findResult);
        } catch (error) {
            console.log(error);
            reject(error);
        }
    });
}

function updateBalance(email, balance) {
    return new Promise(async (resolve, reject) => {
        try {
            console.log(email, balance);
            const collection = db.collection('users');
            const myquery = { email: email };
            const newvalues = { $set: {balance: balance } };

            const updateResult = await collection.updateOne(myquery, newvalues);
            console.log('Update document =>', updateResult);
            if (updateResult.modifiedCount === 1) resolve(true);
            else resolve(false);
        } catch (error) {
            console.log(error);
            reject(error);
        }
    });
}

function all() {
    return new Promise(async (resolve, reject) => {
        try {
            const collection = db.collection('users');
            const findResult = await collection.find({}).toArray();
            console.log('Found documents =>', findResult);
            resolve(findResult);
        } catch (error) {
            console.log(error);
            reject(error);
        }
    });
}

module.exports = {connectDB, disconnectDB, verifyRole, create, find, updateBalance, all};