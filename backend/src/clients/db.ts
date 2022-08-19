import mongoose from 'mongoose';

mongoose
  .connect(String(process.env.MONGO_URI))
  .then(() => console.log('MongoDB: Connected'))
  .catch((err) => console.log(err.message));
