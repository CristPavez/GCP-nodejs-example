const fs = require("fs");

const people = fs.readFileSync("./people.json");
const express = require("express");
const app = express();

/**
 * TODO(developer): Uncomment these variables before running the sample.
 */
const topicNameOrId = "projects/example-01-384300/topics/tema-01";

const data = people;

// Imports the Google Cloud client library
const { PubSub } = require("@google-cloud/pubsub");

// Creates a client; cache this for further use
const pubSubClient = new PubSub();

async function publishMessage(topicNameOrId, data) {
  // Publishes the message as a string, e.g. "Hello, world!" or JSON.stringify(someObject)

  const dataBuffer = Buffer.from(data);
  try {
    const messageId = await pubSubClient
      .topic(topicNameOrId)
      .publishMessage({ data: dataBuffer });
    console.log(`Message ${messageId} published.`);
  } catch (error) {
    console.error(`Received error while publishing: ${error.message}`);

    process.exitCode = 1;
  }
}
publishMessage(topicNameOrId, data);

/**
 * TODO(developer): Uncomment these variables before running the sample.
 */
const subscriptionNameOrId =
  "projects/example-01-384300/subscriptions/tema-01-sub";
const timeout = 60;

function listenForMessages(subscriptionNameOrId, timeout) {
  // References an existing subscription
  const subscription = pubSubClient.subscription(subscriptionNameOrId);

  // Create an event handler to handle messages
  let messageCount = 0;
  const messageHandler = (message) => {
    console.log(`Received message ${message.id}:`);
    console.log(`\tData: ${message.data}`);
    console.log(`\tAttributes: ${message.attributes}`);
    messageCount += 1;

    // "Ack" (acknowledge receipt of) the message
    message.ack();
  };

  // Listen for new messages until timeout is hit
  subscription.on("message", messageHandler);

  // Wait a while for the subscription to run. (Part of the sample only.)
  setTimeout(() => {
    subscription.removeListener("message", messageHandler);
    console.log(`${messageCount} message(s) received.`);
  }, timeout * 1000);
}

listenForMessages(subscriptionNameOrId, timeout);

app.listen(3000, () => {
  console.log("El servidor está corriendo en el puerto 3000");
});
