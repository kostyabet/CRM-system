const { Kafka } = require('kafkajs');

const kafka = new Kafka({
  clientId: 'tasks-service',
  brokers: [process.env.KAFKA_BROKER || 'localhost:9092'],
});
const producer = kafka.producer();

async function log(level, message) {
  await producer.connect();
  await producer.send({
    topic: 'logs',
    messages: [
      {
        value: JSON.stringify({
          service: 'tasks-service',
          level,
          message,
          timestamp: new Date().toISOString(),
        }),
      },
    ],
  });
  await producer.disconnect();
}

module.exports = { log };