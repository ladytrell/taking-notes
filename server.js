
const express = require('express');
//const apiRoutes = require('./routes/apiRoutes');
const htmlRoutes = require('./routes/htmlRoutes');
// Use Heroku process.env.PORT if set, else use 3001
const PORT = process.env.PORT || 3001;
// Instantiate the server
const app = express();

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Direct to the Route files
//app.use('/api', apiRoutes);
app.use('/', htmlRoutes);


// Listen on port 3001
app.listen(PORT, () => {
    console.log(`API server now on port 3001!`);
});