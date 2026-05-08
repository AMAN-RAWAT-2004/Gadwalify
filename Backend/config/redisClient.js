const { createClient }= require('redis')
const dotenv=require('dotenv')
dotenv.config()
const redisClient= createClient({
     url: process.env.REDIS_URL
})

redisClient.on("error", (err) => {
  console.error("Redis Error:", err);
});


async function connectRedis() {
  if (!redisClient.isOpen) {
    await redisClient.connect();
    console.log("Redis Connected ✅");
  }
}

module.exports = {
  redisClient,
  connectRedis
};