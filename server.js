const express = require('express');
const connectDB = require('./config/db');

// Initalize the app.
const app = express();
//Connect to the database
connectDB();
// Initialize the middleware
app.use(express.json({ extended: false }));

app.get('/', (req, res) => {
  res.send('API Running!');
});

// Define the routes
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/users', require('./routes/api/users'));
app.use('/api/contacts', require('./routes/api/contacts'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
