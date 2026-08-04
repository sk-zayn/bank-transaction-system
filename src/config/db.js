const mongoose = require("mongoose");
const dns = require("dns");

// Node on this machine can't auto-detect the Windows DNS servers,
// so we point it at Google's DNS explicitly before connecting.
dns.setServers(["8.8.8.8", "8.8.4.4"]);

async function connectDB() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Server is connected to DB");
  } catch (err) {
    console.log("Error connecting to DB");
    process.exit(1);
  }
}

module.exports = { connectDB };
