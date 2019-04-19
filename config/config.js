require('dotenv').config();  // this line is important!
console.log(process.env.LOCAL_USERNAME, process.env.LOCAL_PASSWORD, process.env.LOCAL_DATABASE, process.env.LOCAL_PORT);
module.exports = {
"development": {
    "username": process.env.LOCAL_USERNAME,
    "password": process.env.LOCAL_PASSWORD,
    "database": process.env.LOCAL_DATABASE,
    "host": "127.0.0.1",
    "dialect": "mysql",
    "migrationStorageTableName": "sequelize_meta",
    "port": process.env.LOCAL_PORT
},
"production": {
  "use_env_variable": "JAWSDB_URL",
  "dialect": "mysql"
}
}