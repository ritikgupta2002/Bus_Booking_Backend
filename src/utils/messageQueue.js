const amqplib = require("amqplib");
const { MESSAGE_BROKER_URL, EXCHANGE_NAME } = require("../config/serverConfig");

const createChannel = async () => {
  try {
    const connection = await amqplib.connect(MESSAGE_BROKER_URL);
    //our message broker is rabbit mq it maintains multiples queues
    const channel = await connection.createChannel();
    //created channel so that message broker can connect with queues
    await channel.assertExchange(EXCHANGE_NAME, "direct", false);
    /*once we created the channel now this message broker helps
         to distribute the message to the queues (because we may have multiple queues)
        */
    return channel;
  } catch (error) {
    throw error;
  }
};

const subscribeMessage = async (channel, service, binding_key) => {
  try {
    const applicationQueue = await channel.assertQueue("REMINDER_QUEUE");
    channel.bindQueue(applicationQueue.queue, EXCHANGE_NAME, binding_key);
    channel.consume(applicationQueue.queue, (msg) => {
      console.log("received data");
      console.log(msg.content.toString());
      const payload = JSON.parse(msg.content.toString());
      service(payload);
      channel.ack(msg);
    });
  } catch (error) {
    throw error;
  }
};

const publishMessage = async (channel, binding_key, message) => {
  try {
    await channel.assertQueue("REMINDER_QUEUE");
    await channel.publish(EXCHANGE_NAME, binding_key, Buffer.from(message));
  } catch (error) {
    throw error;
  }
};

module.exports = {
  createChannel,
  subscribeMessage,
  publishMessage,
};
