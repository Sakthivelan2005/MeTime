// // server.js
// const express = require('express');
// const app = express();
// app.use(express.json());

// let bookings = [ /* your 4 bookings */ ];

// app.get('/api/bookings', (req, res) => res.json(bookings));
// app.post('/api/bookings', (req, res) => {
//   bookings.push(req.body);
//   res.json(bookings);
// });
// app.delete('/api/bookings/:id', (req, res) => {
//   bookings = bookings.filter(b => b.id !== req.params.id);
//   res.json(bookings);
// });

// app.listen(3000);
