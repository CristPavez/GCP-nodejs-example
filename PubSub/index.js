import { listenForMessages } from "./Subscription";
import { publishMessage } from "./Topic";

// * Libraries
const fs = require("fs");
const people = fs.readFileSync("./people.json");
const { PubSub } = require("@google-cloud/pubsub");

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

export function Pubsub_General(condition) {
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
