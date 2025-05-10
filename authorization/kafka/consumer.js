const { checkUsersExists } = require('./../controllers/authController');

const { warn } = require('./logger');

const { Kafka } = require('kafkajs');

const kafka = new Kafka({ brokers: [process.env.KAFKA_BROKER || 'localhost:9092'] });
const consumer = kafka.consumer({ groupId: 'auth-service' });
const producer = kafka.producer();

async function run() {
  await consumer.connect();
  await producer.connect();
  await consumer.subscribe({ topic: 'check-users' });

  await consumer.run({
    eachMessage: async ({ message }) => {
      const { users, correlationId } = JSON.parse(message.value.toString());

      const { exists } = await checkUsersExists(users);

      if (!exists) {
        warn(`User(s) ${users} do not exist`);
      }

      await producer.send({
        topic: 'check-users-response',
        messages: [
          {
            key: correlationId,
            value: JSON.stringify({ users, exists, correlationId })
          }
        ]
      });
    }
  });
}

run().catch(console.error);