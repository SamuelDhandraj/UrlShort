const { MongoClient } = require("mongodb");

// Connection URI
const uri = "mongodb://127.0.0.1:27017";

// Database Name
const dbName = "UrlShort";

// Create a new MongoClient
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Connect to the MongoDB server
client.connect((err) => {
  if (err) {
    console.error("Error connecting to MongoDB:", err);
    return;
  }

  console.log("Connected to MongoDB");

  // Now you can use the 'client' object to interact with the database

  // Example: Access a specific database
  const db = client.db(dbName);

  // ... Your code here ...

  // Close the connection when you're done
  client.close();
});
