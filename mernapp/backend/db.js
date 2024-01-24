const mongoose = require("mongoose");
const mongoURI =
  "mongodb+srv://user2000:test1234@cluster0.np8uxuu.mongodb.net/gofoodmern?retryWrites=true&w=majority";

const connectToMongoDB = async () => {
  try {
    await mongoose.connect(mongoURI);
    console.log("Connected to MongoDB");
  } catch (err) {
    console.error("Error connecting to MongoDB:", err);
    // If an error occurs during connection, exit the function
    return;
  }

  // If the connection is successful, proceed with fetching data
  fetchDataFromMongoDB();
};

const fetchDataFromMongoDB = async () => {
  try {
    const fetched_data = mongoose.connection.db.collection("foodItem");
    const data = await fetched_data.find({}).toArray();
    console.log(); // Log the fetched data
  } catch (err) {
    console.error("Error fetching data:", err);
  }
};

// Export the connectToMongoDB function for external use
module.exports = connectToMongoDB;

// Example usage:
// connectToMongoDB();
