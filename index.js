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
app.use( express.json() );
app.use( express.static('public') );

// routes
app.use( '/api/auth', require('./routes/auth') )
app.use( '/api/events', require('./routes/events') )

app.get('*', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
})

// port listening
app.listen( process.env.PORT, () => {
  console.log(`server running on port ${process.env.PORT}`);
})