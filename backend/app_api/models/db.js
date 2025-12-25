var mongoose = require("mongoose"); // Import mongoose

mongoose.connect(process.env.MONGODB_URI); // Connect to the database

// When successfully connected
mongoose.connection.on("connected", () => {
  console.log("Mongoose connected to " + process.env.MONGODB_URI);
});

// If the connection throws an error
mongoose.connection.on("error", (err) => {
  console.log("Mongoose connection error: " + err);
});

// When the connection is disconnected
mongoose.connection.on("disconnected", () => {
  console.log("Mongoose disconnected");
});

// If the Node process ends, close the Mongoose connection
process.on("SIGINT", () => {
  mongoose.connection.close().then(() => {
    process.exit(0);
  });
});

require("./venue"); // Ensure venue model is registered
require("./user"); // Ensure user model is registered
