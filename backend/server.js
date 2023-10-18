const dotenv = require('dotenv');
const connectToDataBase = require('./database/connect.js');

dotenv.config();
require('./modules/express');

//connectToDataBase();