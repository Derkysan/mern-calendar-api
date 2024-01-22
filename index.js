const express = require('express');
const { dbConnection } = require('./database/config');
const cors = require('cors');
require('dotenv').config();

// server
const app = express();

// connect database
dbConnection();

// cors
app.use(cors());

// middlewares
app.use( express.static('public') );
app.use( express.json() );

// routes
app.use( '/api/auth', require('./routes/auth') )
app.use( '/api/events', require('./routes/events') )

// port listening
app.listen( process.env.PORT, () => {
  console.log(`server running on port ${process.env.PORT}`);
})