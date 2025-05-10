const pendingResponses = new Map();
const { error, info } = require('./logger');

function createResponseWaiter(correlationId) {
  return new Promise((resolve, reject) => {
    const timeout = setTimeout(() => {
      pendingResponses.delete(correlationId);
      reject(new Error('Timeout waiting for user validation'));
    }, 5000);

    pendingResponses.set(correlationId, (data) => {
      clearTimeout(timeout);
      info(`User validation resolved for correlationId: ${correlationId}`, { correlationId });
      resolve(data);
    });
  });
}

function handleKafkaResponse(response) {
  const parsedResponse = JSON.parse(response);
  const { correlationId } = parsedResponse;
  const resolver = pendingResponses.get(correlationId);
  if (resolver) {
    resolver(parsedResponse);
    info(`Resolved user validation for correlationId: ${correlationId}`, { correlationId });
    pendingResponses.delete(correlationId);
  }
}

module.exports = { createResponseWaiter, handleKafkaResponse };
