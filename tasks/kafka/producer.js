const { Kafka } = require('kafkajs');

const kafka = new Kafka({ brokers: [process.env.KAFKA_BROKER || 'localhost:9092'] });
const producer = kafka.producer();

async function checkUsers(users, correlationId) {
  await producer.connect();
  await producer.send({
    topic: 'check-users',
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