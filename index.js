const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware untuk menyajikan file statis (jika ada frontend)
app.use(express.static('public'));

// Endpoint API
app.get('/api/:date?', (req, res) => {
  let inputDate = req.params.date;
  let date;

  if (!inputDate) {
    date = new Date();
  } else if (/^\d+$/.test(inputDate)) {
    date = new Date(parseInt(inputDate));
  } else {
    date = new Date(inputDate);
  }

  if (isNaN(date.getTime())) {
    return res.json({ error: "Invalid Date" });
  }

  res.json({
    unix: date.getTime(),
    utc: date.toUTCString()
  });
});

// Route untuk halaman utama (jika ada frontend)
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html');
});

// Jalankan server
app.listen(PORT, () => {
  console.log(`Server berjalan di http://localhost:${PORT}`);
});