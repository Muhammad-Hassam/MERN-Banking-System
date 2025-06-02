const mongoose = require("mongoose");

exports.ConnectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_DB);
    console.log(`the db is connect with ${mongoose.connection.host}`);
  } catch (error) {
    mongoose.disconnect();
    process.exit(1);
  }
};
