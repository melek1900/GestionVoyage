const express = require('express');
const cors = require('cors');
require('dotenv').config();
const { Pool } = require('pg');

const utilisateursRoutes = require('./routes/utilisateurs.routes');
const reservationsRoutes = require('./routes/reservations.routes');
const hebergementsRoutes = require('./routes/hebergements.routes');

const db = require('./models/db');


const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Connexion à la base PostgreSQL
const pool = new Pool({ connectionString: process.env.DATABASE_URL });
pool.connect()
  .then(() => console.log("✅ Connexion PostgreSQL réussie"))
  .catch(err => console.error("❌ Erreur de connexion PostgreSQL :", err));
  
// Routes principales
app.use('/api/utilisateurs', utilisateursRoutes);
app.use('/api/hebergements', hebergementsRoutes);
app.use('/api/reservations', reservationsRoutes);

app.listen(port, () => {
  console.log(`🚀 Serveur backend lancé sur http://localhost:${port}`);
});
