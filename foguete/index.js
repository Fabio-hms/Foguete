const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

app.use(bodyParser.json());

const users = [];
const quotes = [];
const launches = [];

app.post('/users', (req, res) => {
  const { name, age } = req.body;
  users.push({ name, age });
  res.json({ name, age });
});

app.get('/users/:name', (req, res) => {
  const { name } = req.params;
  const user = users.find(u => u.name === name);
  res.json(user);
});

app.post('/auth', (req, res) => {
  const { name } = req.body;
  const user = users.find(u => u.name === name);
  res.json({ authenticated: Boolean(user), age: user?.age });
});

app.post('/quotes', (req, res) => {
  const quote = req.body;
  quotes.push(quote);
  res.json(quote);
});

app.get('/quotes/:rocketName', (req, res) => {
  const { rocketName } = req.params;
  const quote = quotes.find(q => q.rocket.name === rocketName);
  res.json(quote);
});

app.post('/launches', (req, res) => {
  const launch = req.body;
  launches.push(launch);
  res.json(launch);
});

app.get('/launches/:date', (req, res) => {
  const { date } = req.params;
  const launch = launches.find(l => l.date === date);
  res.json(launch);
});

app.listen(port, () => console.log(`Server is running at http://localhost:${port}`));
