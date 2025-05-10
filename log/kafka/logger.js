const { Kafka } = require('kafkajs');

const kafka = new Kafka({
  brokers: [process.env.KAFKA_BROKER || 'localhost:9092'],
});

const producer = kafka.producer();
let isConnected = false;

async function log(service, level, message, extra = {}) {
  if (!isConnected) {
    await producer.connect();
    isConnected = true;
  }

  const logEntry = {
    timestamp: new Date().toISOString(),
    service,
    level,
    message,
    ...extra,
  };

  await producer.send({
    topic: 'logs',
    messages: [{ value: JSON.stringify(logEntry) }],
  });
}

module.exports = { log };