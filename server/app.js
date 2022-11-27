
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const config = require('./config/config');
const cors = require('cors')

app.use(bodyParser.json());
app.use(cors())
require('./routes')(app);
app.listen(config.port)
