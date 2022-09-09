import mongoose from 'mongoose';

const URI = process.env.MONGO_URI || 'mongodb://gustavo:123@localhost:27017/'
const initDB = () => {

  mongoose.connect(URI);

  mongoose.connection.once('open', () => {
    console.log('connected to database');
  });

}

export default initDB;