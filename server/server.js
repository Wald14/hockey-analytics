const express = require('express');
const fetch = require('node-fetch');
const cors = require('cors');

const path = require('path')
const routes = require('./routes')

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(routes)

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, "..", 'client/build')));

  app.get('/*', (req, res) => {
    res.sendFile(path.resolve( __dirname, "..", 'client/build/index.html'))
  })
}

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
