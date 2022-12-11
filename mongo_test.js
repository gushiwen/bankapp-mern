/**
const mongoose = require('mongoose');
const connection = 'mongodb://localhost:27017';

mongoose.connect(connection)
.then(() => console.log('MongoDb connected'));
*/

const { MongoClient } = require('mongodb');
// or as an es module:
// import { MongoClient } from 'mongodb'

// Connection URL
const url = 'mongodb://localhost:27017';
const client = new MongoClient(url);

// Database Name
const dbName = 'myProject';

async function main() {
  // Use connect method to connect to the server
  await client.connect();
  console.log('Connected successfully to server');
  const db = client.db(dbName);
  const collection = db.collection('customers');

  var name = 'user' + Math.floor(Math.random()*10000);
  var email = name + '@mit.edu';
  var doc = {name, email};

  // the following code examples can be pasted here...
  const insertResult = await collection.insertOne(doc);
  console.log('Inserted documents =>', insertResult);

  const findResult = await collection.find({}).toArray();
  console.log('Found documents =>', findResult);
  
  return 'done.';
}

main()
  .then(console.log)
  .catch(console.error)
  .finally(() => client.close());
