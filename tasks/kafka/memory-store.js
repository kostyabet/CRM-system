const pendingResponses = new Map();

function createResponseWaiter(correlationId) {
  return new Promise((resolve, reject) => {
    const timeout = setTimeout(() => {
      pendingResponses.delete(correlationId);
      reject(new Error('Timeout waiting for user validation'));
    }, 5000);

    pendingResponses.set(correlationId, (data) => {
      clearTimeout(timeout);
      resolve(data);
    });
  });
}

function handleKafkaResponse(response) {
  const { correlationId } = response;
  const resolver = pendingResponses.get(correlationId);
  if (resolver) {
    resolver(response);
    pendingResponses.delete(correlationId);
  }
}

module.exports = { createResponseWaiter, handleKafkaResponse };
