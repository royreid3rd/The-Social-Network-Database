const express = require('express');
const routes = require('./routes');
const { connectDB } = require('./config/connection');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(routes);

connectDB().then(async () => {

  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}).catch(err => {
  console.error('Error connecting to database:', err.message);
  process.exit(1);
});
