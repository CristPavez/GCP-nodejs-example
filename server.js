const express = require("express");
const app = express();
const { GoogleAuth } = require("google-auth-library");
const pubsub_General = require("./PubSub");
const credentials = require("./key.json");

// * Function in Google Cloud Platform
const email = credentials.client_email;
const key = credentials.private_key;
const project = credentials.project_id;

async function GoogleAuth_() {
  const auth = new GoogleAuth({
    keyFile: "key.json",
    scopes: "https://www.googleapis.com/auth/cloud-platform",
  });
  const credentials = await auth.getClient();
}
// * Login in Google Cloud Platform
GoogleAuth_();

// * START PUB/SUB
pubsub_General("publish");

const { BigQuery } = require("@google-cloud/bigquery");

// Crea una instancia de BigQuery con las credenciales necesarias
const bigquery = new BigQuery({
  projectId: project,
  credentials: {
    client_email: email,
    private_key: key,
  },
});

// Define una ruta para obtener los datos de la tabla
app.get("/tabla", async (req, res) => {
  try {
    // Obtiene los datos de la tabla especificada
    const [rows] = await bigquery.dataset("test_01").table("nodejs").getRows();

    // Retorna los datos como una respuesta HTTP JSON
    res.json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error al obtener los datos");
  }
});

// * Start Server
app.listen(3000, () => {
  console.log("El servidor está corriendo en el puerto 3000");
});
