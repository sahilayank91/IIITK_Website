/*Created by Sahil Ayank*/

/*
 Database related configurations
 */
var DATABASE_NAME = "iiitk_website";
var DATABASE_PORT = 27017;
var DATABASE_HOST = "localhost";
var DATABASE_USERNAME = "admin";
var DATABASE_PASSWORD = "admin";


var DATABASE_URL =  DATABASE_HOST +":" + DATABASE_PORT+ "/"+ DATABASE_NAME;

module.exports = {
    HOST: DATABASE_HOST,
    PORT : DATABASE_PORT,
    DATABASE_NAME : DATABASE_NAME,
    DATABASE_URL:DATABASE_URL,
};




