const Redis = require("ioredis");

const createSubscriber = () => {
  return new Redis({
    host: process.env.REDIS_HOST || "127.0.0.1",
    port: process.env.REDIS_PORT || 6379,
  });
};

const createPublisher = () => {
  return new Redis({
    host: process.env.REDIS_HOST || "127.0.0.1",
    port: process.env.REDIS_PORT || 6379,
  });
};

module.exports = { createSubscriber, createPublisher };
