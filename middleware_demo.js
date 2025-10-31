const express = require('express');
const app = express();

function logger(req, res, next) {
  console.log(`${req.method} ${req.url} - ${new Date().toLocaleTimeString()}`);
  next();
}

function auth(req, res, next) {
  const token = req.headers['authorization'];
  if (token === 'Bearer secret123') {
    next();
  } else {
    res.status(401).send('Unauthorized Access!');
  }
}

app.use(logger);
app.use(express.json());

app.get('/', (req, res) => {
  res.send('🌍 Welcome! This is a public route.');
});

app.get('/secure', auth, (req, res) => {
  res.send('✅ Access Granted to Secure Route!');
});

app.listen(3000, () => console.log('Server running on port 3000'));
