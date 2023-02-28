import { createClient } from 'redis';

const redis = global.redis || createClient()

redis.on('error', (err: any) => console.log('Redis error: ', err))

await redis.connect();
if (process.env.NODE_ENV === 'development') {
    global.redis = redis;
}


export { redis } 