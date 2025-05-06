const express = require('express');
const app = express();
const PORT = 3000;

// Endpoint API
app.get('/api/:date?', (req, res) => {
  let date;
  const inputDate = req.params.date;

  if (!inputDate) {
    // Jika tidak ada parameter, gunakan waktu sekarang
    date = new Date();
  } else if (/^\d+$/.test(inputDate)) {
    // Jika input berupa angka (UNIX timestamp)
    date = new Date(parseInt(inputDate));
  } else {
    // Jika input berupa string tanggal
    date = new Date(inputDate);
  }

  // Validasi tanggal
  if (isNaN(date.getTime())) {
    return res.json({ error: "Invalid Date" });
  }

  // Response JSON
  res.json({
    unix: date.getTime(),
    utc: date.toUTCString()
  });
});

// Route untuk halaman utama
app.get('/', (req, res) => {
  res.send(`
    <h1>Timestamp Microservice API</h1>
    <p>Contoh penggunaan:</p>
    <ul>
      <li><a href="/api/2023-10-10">/api/2023-10-10</a></li>
      <li><a href="/api/1451001600000">/api/1451001600000</a></li>
      <li><a href="/api/invalid-date">/api/invalid-date</a></li>
      <li><a href="/api/">/api/</a> (waktu sekarang)</li>
    </ul>
  `);
});

// Jalankan server
app.listen(PORT, () => {
  console.log(`Server berjalan di http://localhost:${PORT}`);
});