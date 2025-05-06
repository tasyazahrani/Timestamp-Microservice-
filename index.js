// index.js
const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 3000;

// Enable CORS for all routes
app.use(cors({ optionsSuccessStatus: 200 })); // some legacy browsers choke on 204

// Serve static files from the 'public' directory
app.use(express.static('public'));

// Root route to serve the HTML page
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html');
});

// API endpoint for timestamp
app.get('/api/:date?', (req, res) => {
  let dateInput = req.params.date;
  let date;

  // If no date is provided, use current date
  if (dateInput === undefined) {
    date = new Date();
  } else {
    // Check if the date is a unix timestamp (all digits)
    if (/^\d+$/.test(dateInput)) {
      // Convert string to number
      date = new Date(parseInt(dateInput));
    } else {
      // Try to parse as a date string
      date = new Date(dateInput);
    }
  }

  // Check if date is valid
  if (isNaN(date.getTime())) {
    return res.json({ error: "Invalid Date" });
  }

  // Return the unix timestamp and UTC string
  res.json({
    unix: date.getTime(),
    utc: date.toUTCString()
  });
});

// Start the server
app.listen(port, () => {
  console.log(`App is listening on port ${port}`);
  console.log(`Server running at http://localhost:${port}/`);
});