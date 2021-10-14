import redis from 'redis';
import config from './config';
import util from 'util';
const client = redis.createClient({
  host: config.redis.host
});

client.on('connect', () => {
  console.log("connected to redis successfully")
});

client.on('error', () => {
  console.log("connecting to redis failed")
});

client.on('end', () => {
  console.log("Client was disconnected to redis.")
});

export const redisSetex = util.promisify(client.setex).bind(client);
export const redisGet = util.promisify(client.get).bind(client);
export const redisDelete = (userId: string) => client.del(userId);


export default client;