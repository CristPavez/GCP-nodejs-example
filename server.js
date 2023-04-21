const express = require("express");
const app = express();
const { GoogleAuth } = require("google-auth-library");
const { Pubsub_General } = require("./PubSub");

// * Function in Google Cloud Platform
async function GoogleAuth() {
  const auth = new GoogleAuth({
    keyFile: "key.json",
    scopes: "https://www.googleapis.com/auth/cloud-platform",
  });
  const credentials = await auth.getClient();
}
// * Login in Google Cloud Platform
GoogleAuth();

// * START PUB/SUB
// Pubsub_General("publish");

// * Start Server
app.listen(3000, () => {
  console.log("El servidor está corriendo en el puerto 3000");
});
