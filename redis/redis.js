const Redis = require('ioredis');

let redis = new Redis({
    port: 6379,          // Redis port
    host: '112.124.110.38',   // Redis host
    family: 4,           // 4 (IPv4) or 6 (IPv6)
    password: '',
    db: 0
  })

let redisUtil = {
    setExpire: (key,value, expire)=>{

        redis.set(key, value).then((result)=>{
            console.log('result',result)
        });
        redis.expire(key,expire, (err)=>{
            console.log(err)
        });
    
    },
    setExpreAt:(key,value, expireAt)=>{
        redis.set(key, value);
        redis.expireAt(key,expireAt);
    },
    set:(key,value)=>{
        redis.set(key, value);
    },
    get: async(key)=>{
        let value = ''
         await redis.get(key, (err, result)=>{
            value = result
        })
        return value;
    }
}


exports.redisUtil = redisUtil;

exports.redis = redis;
