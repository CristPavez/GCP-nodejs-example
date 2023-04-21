export function listenForMessages(subscriptionNameOrId, timeout, pubSubClient) {
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
