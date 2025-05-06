const express = require('express');
const app = express();
const port = 3000;

// Middleware untuk menghandle request
app.use(express.static('public'));

app.get('/api/timestamp/:date_string?', (req, res) => {
  const { date_string } = req.params;

  let date;

  // Mengecek apakah date_string kosong
  if (!date_string) {
    date = new Date();
  } else {
    date = isNaN(date_string) ? new Date(date_string) : new Date(parseInt(date_string));
  }

  if (date == 'Invalid Date') {
    return res.json({
      error: 'Invalid Date'
    });
  }

  res.json({
    unix: date.getTime(),
    utc: date.toUTCString()
  });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
