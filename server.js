const dotenv = require('dotenv');
const connectToDataBase = require('./src/database/connect');

dotenv.config();
require('./modules/express');

connectToDataBase();