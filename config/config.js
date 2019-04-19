require('dotenv').config();  // this line is important!
module.exports = {
"development": {
    "username": process.env.LOCAL_USERNAME,
    "password": process.env.LOCAL_PASSWORD,
    "database": process.env.LOCAL_DATABASE,
    "host": "127.0.0.1",
    "dialect": "mysql",
    "migrationStorageTableName": "sequelize_meta"
},
"production": {
  "use_env_variable": "JAWSDB_URL",
  "dialect": "mysql"
}
}