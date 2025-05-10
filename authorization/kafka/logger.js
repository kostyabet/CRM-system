const { Kafka } = require('kafkajs');

const kafka = new Kafka({
  clientId: 'auth-service',
  brokers: [process.env.KAFKA_BROKER || 'localhost:9092'],
});

const producer = kafka.producer();
let isConnected = false;

async function log(level, message, extra = {}) {
  if (!isConnected) {
    await producer.connect();
    isConnected = true;
  }

  const logEntry = {
    timestamp: new Date().toISOString(),
    service: 'auth-service',
    level,
    message,
    ...extra,
  };

  await producer.send({
    topic: 'logs',
    messages: [{ value: JSON.stringify(logEntry) }],
  });
}

function info(msg, extra) {
  return log('INFO', msg, extra);
}

function error(msg, extra) {
  return log('ERROR', msg, extra);
}

function warn(msg, extra) {
  return log('WARN', msg, extra);
}

function debug(msg, extra) {
  return log('DEBUG', msg, extra);
}

module.exports = { info, error, warn, debug };