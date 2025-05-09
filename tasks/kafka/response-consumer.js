const { Kafka } = require('kafkajs');

const kafka = new Kafka({ brokers: ['kafka:9092'] });
const consumer = kafka.consumer({ groupId: 'tasks-response-handler' });

async function listenForResponses(handleResponse) {
  await consumer.connect();
  await consumer.subscribe({ topic: 'check-users-response' });

  await consumer.run({
    eachMessage: async ({ message }) => {
      const { userId, exists, correlationId } = JSON.parse(message.value.toString());
      handleResponse({ userId, exists, correlationId });
    },
  });
}

module.exports = { listenForResponses };