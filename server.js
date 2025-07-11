const express = require('express');
const path = require('path');

// Import routes
const route1 = require('./src/npm/auth');
const route2 = require('./src/npm/verification');
const { router: saveDetailsRouter } = require('./src/npm/saveDetails');
const { router: dataRouter } = require('./src/npm/data');

const app = express();
app.use(express.json());

// Use the imported routes (no custom CORS)
app.use(route1);
app.use(route2);
app.use(saveDetailsRouter);
app.use(dataRouter);

// Serve static files
app.use(express.static(path.join(__dirname, 'src', 'public')));
app.use(express.static(path.join(__dirname, 'src', 'lib')));

// Start server
app.listen(3000, () => {
  console.log('Server Listening on port 3000!');
});
