
var Promise = require("bluebird");
var redis = Promise.promisifyAll(require("redis"));
var GLOBAL = require(__BASE__ + "config/global");
var client = redis.createClient(GLOBAL.REDIS.getRedisPort(), GLOBAL.REDIS.getRedisHost());
var LOGGER = require(__BASE__ + "modules/utils/Logger");

client.on('connect', function () {
    LOGGER.log.debug('[TOKEN AUTH] ' + 'Redis connection for Session Management is successful');
});


module.exports = {
    REDIS_CLIENT:client
}