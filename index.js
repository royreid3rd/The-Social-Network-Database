const express = require('express');
const routes = require('./routes');
const { connection } = require('./config/connection');
const seedUsers = require('./seeds/users-seeds');
const seedThoughts = require('./seeds/thoughts-seeds');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(routes);

connection.once('open', async () => {
  await seedUsers();
  await seedThoughts();
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});