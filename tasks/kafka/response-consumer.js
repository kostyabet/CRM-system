const { Kafka } = require('kafkajs');
const { handleKafkaResponse } = require('./memory-store');

const kafka = new Kafka({ brokers: ['kafka:9092'] });
const consumer = kafka.consumer({ groupId: 'tasks-response-handler' });

async function listenForResponses() {
  await consumer.connect();
  await consumer.subscribe({ topic: 'check-users-response' });

  await consumer.run({
    eachMessage: async ({ message }) => {
      const value = message.value.toString();
      handleKafkaResponse(value);
    },
  });
}

module.exports = { listenForResponses };