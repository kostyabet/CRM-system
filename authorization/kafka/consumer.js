const { checkUsersExists } = require('./../controllers/authController');

const { Kafka } = require('kafkajs');

const kafka = new Kafka({ brokers: ['kafka:9092'] });
const consumer = kafka.consumer({ groupId: 'auth-service' });
const producer = kafka.producer();

async function run() {
  await consumer.connect();
  await producer.connect();
  await consumer.subscribe({ topic: 'check-user' });

  await consumer.run({
    eachMessage: async ({ message }) => {
      const { users, correlationId } = JSON.parse(message.value.toString());

      const exists = await checkUsersExists(users);

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