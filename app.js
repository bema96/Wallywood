// app.js

import express from 'express';
import routes from './routes.js'; // Importér routeren fra routes.js
import fetch from 'node-fetch';
import cors from 'cors';

const app = express();
const port = 4525;

// Middleware for at kunne håndtere JSON og URL-encoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors({
  origin: '*', // Tillader alle domæner at tilgå serveren
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type'],
}));

// Brug ruterne
app.use('/', routes); // Tilføjer ruterne fra routes.js til appen


// Root-rute (valgfri)
app.get('/', (req, res) => {
  res.send('Welcome to the API');
});

// Start serveren
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
