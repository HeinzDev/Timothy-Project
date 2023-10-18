const dotenv = require('dotenv');
const connectToDataBase = require('./database/connect');

dotenv.config();
require('./modules/express');

//connectToDataBase();