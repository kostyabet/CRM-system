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
  const parsedResponse = JSON.parse(response);
  const { correlationId } = parsedResponse;
  const resolver = pendingResponses.get(correlationId);
  if (resolver) {
    resolver(parsedResponse);
    pendingResponses.delete(correlationId);
  }
}

module.exports = { createResponseWaiter, handleKafkaResponse };
