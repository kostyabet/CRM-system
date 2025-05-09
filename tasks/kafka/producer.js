const { Kafka } = require('kafkajs');

const kafka = new Kafka({ brokers: ['kafka:9092'] });
const producer = kafka.producer();

async function checkUsers(users, correlationId) {
  await producer.connect();
  await producer.send({
    topic: 'check-user',
    messages: [
      {
        key: correlationId,
        value: JSON.stringify({ users, correlationId })
      }
    ],
  });
  await producer.disconnect();
}

module.exports = { checkUsers };