const express = require('express');
const router = express.Router();
const { codes } = require('./saveDetails'); // adjust path as needed

router.get('/verification/:id', (req, res) => {
  const { id } = req.params;

  if (!codes[id]) {
    return res.status(404).json({ error: 'Code not found' });
  }

  res.json({
    [id]: {
      user: codes[id].user,
      ip: codes[id].ip,
      timestamp: codes[id].timestamp,
      redirect: codes[id].redirect,
    },
  });
});

module.exports = router;
