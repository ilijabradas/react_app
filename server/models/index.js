import mongoose from 'mongoose';
import User from './user';
let connect = (uri) => {
  mongoose.connect(uri);
  // plug in the promise library:
  mongoose.Promise = require('bluebird');

  mongoose.connection.on('error', (err) => {
    console.error(`Mongoose connection error: ${err}`);
    process.exit(1);
  });
  User;
};
export default connect;
// mongod --dbpath C:/Users/ilija/Desktop/mongoData
// mongo
