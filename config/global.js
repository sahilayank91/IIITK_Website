

var TITLE = "iiitk_website";
var ENV ="local";
/*
 Redis Session related configurations
 */
var REDIS_CONFIG = {
    host: "localhost",
    port: 6379,
    sessionSecretKey: "SOmeSessionSecretKEy",
    //one day
    ttl: 86400
};

/*
 Logger related configurations
 */
var LOGGER_CONFIG = {
    baseDirectory: "/logs",
    infoLogFile: TITLE + ".log",
    exceptionLogFile: TITLE + "_Exceptions.log"
};


module.exports = {
    REDIS: {
        getRedisHost: function
            () {
            return REDIS_CONFIG.host;
        },
        getRedisPort: function () {
            return REDIS_CONFIG.port;
        },
        getRedisSessionSecretKey: function () {
            return REDIS_CONFIG.sessionSecretKey;
        },
        getRedisSessionTTL: function () {
            return REDIS_CONFIG.ttl;
        }
    },
    LOGGER: {
        getLoggerBaseDirectory: function () {
            return LOGGER_CONFIG.baseDirectory;
        },
        getInfoLogFilename: function () {
            return LOGGER_CONFIG.infoLogFile;
        },
        getExceptionLogFilename: function () {
            return LOGGER_CONFIG.exceptionLogFile;
        }
    },
    getEnvironment: function () {
        return ENV;
    },
};