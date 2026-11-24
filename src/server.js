const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const todoRoutes = require('./routes/todoRoutes');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello Kratos, Todo API is running!');
});

// Mount todo routes
app.use('/api/todos', todoRoutes);

// Connect to MongoDB Atlas (MONGO_URI must be set in .env)
const mongoUri = process.env.MONGO_URI;
if (!mongoUri) {
  console.error(
    'MONGO_URI is not set. Please set MONGO_URI in backend/.env to your MongoDB Atlas connection string.'
  );
  process.exit(1);
}

mongoose
  .connect(mongoUri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB Atlas');
    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
    // app.listen(PORT, '127.0.0.1', () => {
    //   console.log(`Backend running on http://127.0.0.1:${PORT}`);
    // });
  })
  .catch((err) => {
    console.error('Failed to connect to MongoDB Atlas', err);
    process.exit(1);
  });