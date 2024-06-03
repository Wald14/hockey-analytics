const express = require('express');
const path = require('path');
const cors = require('cors');
const routes = require('./routes');

const PORT = process.env.PORT || 3001;
const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(routes);

// Serve static files from the React app
app.use(express.static(path.join(__dirname, '../client/build')));

// Catchall handler to serve the React app for any route
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../client/build', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
