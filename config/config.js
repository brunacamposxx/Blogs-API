require('dotenv').config();

module.exports = {
  development: {
    username: 'root',
    password: '8910',
    database: 'blogs_api',
    host: 'localhost',
    dialect: 'mysql',
  },
  test: {
    username: 'root',
    password: '8910',
    database: 'blogs_api',
    host: 'localhost',
    dialect: 'mysql',
  },
  production: {
    username: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: 'blogs_api',
    host: process.env.HOSTNAME,
    dialect: 'mysql',
  },
};