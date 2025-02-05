// Create web server
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');
const comments = require('./comments.json');

// Set public folder as root
app.use(express.static('public'));

// Allow front-end access to node_modules folder
app.use('/scripts', express.static(`${__dirname}/node_modules/`));

// Parse POST data as URL encoded data
app.use(bodyParser.urlencoded({ extended: true }));

// Parse POST data as JSON
app.use(bodyParser.json());

// Show index.html when root is accessed
app.get('/', (req, res) => {
  res.sendFile(`${__dirname}/index.html`);
});

// Get comments
app.get('/comments', (req, res) => {
  res.json(comments);
});

// Add a comment
app.post('/comments', (req, res) => {
  // Load existing comments
  const comments = require('./comments.json');

  // Add new comment
  comments.push(req.body);

  // Save comments to file
  fs.writeFile(
    path.join(__dirname, 'comments.json'),
    JSON.stringify(comments, null, 4),
    (error) => {
      // If error, log to console
      if (error) {
        console.error(error);
      }
    }
  );

  // Send new comment back
  res.json(req.body);
});

// Start server on port 3000
const server = app.listen(3000, () => {
  console.log('Server listening on port 3000');
});

// Close server
function closeServer() {
  server.close();
}

module.exports = closeServer;