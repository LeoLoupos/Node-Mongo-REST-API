var redis = require('redis');
var redisClient = redis.createClient({host : 'localhost', port : 6379});

//Event Handdlers
redisClient.on('connect', function(){
    console.log('Connected to Redis');
});

redisClient.on('ready',function() {
 console.log("Redis is ready");
});

redisClient.on('error',function(err) {
 console.log("Error in Redis : " + err);
});

/* GET / products,orders, get /id products,orders */
function checkCachedData(req, res, next){
    let key = "__expIress__" + req.originalUrl || req.url;
    
    redisClient.get(key, function(err, reply){
      if(reply){
        res.send(JSON.parse(reply));
      }else{
        res.sendResponse = res.send;
        res.send = (body) => {
            redisClient.setex(key, 2 * 3600, JSON.stringify(body));
            res.sendResponse(body);
        }
        next();
      }
    });
}

module.exports = {
    checkCachedData
}