require('dotenv').config();

const {
  NODE_ENV,
  PORT,
  BASE_URL,
  JWT_SECRET,
} = process.env;


const currentPORT = NODE_ENV === 'production' && PORT ? PORT : '3005';
const baseUrl = NODE_ENV === 'production' && BASE_URL ? BASE_URL : 'mongodb://localhost:27017/moviesdb';
const jwtSecret = NODE_ENV === 'production' && JWT_SECRET ? JWT_SECRET : 'jwt-dev';


module.exports = { currentPORT, baseUrl, jwtSecret };
