const express = require('express');
const cors = require('cors');
const path = require('path');

// Import routes
const route1 = require('./src/npm/auth');
const route2 = require('./src/npm/verification');
const { router: saveDetailsRouter } = require('./src/npm/saveDetails');
const { router: dataRouter } = require('./src/npm/data');

const app = express();

// Custom CORS middleware
app.use((req, res, next) => {
  const origin = req.get('Origin');

  // Allow GET from any origin
  if (req.method === 'GET') {
    res.setHeader('Access-Control-Allow-Origin', '*');
  } 
  // Restrict POST and PUT to same-origin only
  else if (['POST', 'PUT'].includes(req.method)) {
    const allowedOrigin = 'http://localhost:3000'; // Change this to your actual frontend URL
    if (origin === allowedOrigin || origin === 'https://scratch-id.onrender.com') {
      res.setHeader('Access-Control-Allow-Origin', allowedOrigin);
    } else {
      return res.status(403).json({ error: 'Forbidden: Cross-origin POST/PUT not allowed' });
    }
  }

  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    return res.sendStatus(204);
  }

  next();
});

app.use(express.json());

// Use the imported routes
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
