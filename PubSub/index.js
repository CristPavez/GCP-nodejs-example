// * Libraries
const fs = require("fs");
const people = fs.readFileSync("./people.json");
const { PubSub } = require("@google-cloud/pubsub");
const publishMessage = require("./Topic");
const listenForMessages = require("./Subscription");

// * CONFIGURATION PUB/SUB PROJECT
const projectId = "example-01-384300";
const topic = "projects/example-01-384300/topics/tema-01";
const subscription = "projects/example-01-384300/subscriptions/tema-01-sub";
// * Subscription Pub/Sub
const subscriptionNameOrId = subscription;
const timeout = 60;
// * Topic Pub/Sub
const topicNameOrId = topic;
const data = people;
//---------------------------------------------------------//
// * Creates a client PubSub
const pubSubClient = new PubSub({ projectId });

function pubsub_General(condition) {
  try {
    if (condition === "publish") {
      // * publishMessage
      publishMessage(topicNameOrId, data, pubSubClient);
    } else if (condition === "listen") {
      // * listenForMessages
      listenForMessages(subscriptionNameOrId, timeout, pubSubClient);
    }
  } catch (error) {
    console.info(error);
  }
}
module.exports = pubsub_General;
