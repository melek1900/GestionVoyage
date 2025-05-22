const express = require('express');
const router = express.Router();
const pool = require('../models/db');

// 🔹 GET tous les utilisateurs
router.get('/', async (req, res) => {
  try {
    const result = await pool.query('SELECT id, nom, email, role, date_creation FROM utilisateurs ORDER BY id DESC');
    res.status(200).json(result.rows);
  } catch (error) {
    console.error('❌ Erreur GET utilisateurs :', error);
    res.status(500).json({ error: 'Erreur serveur' });
  }
});

// 🔹 POST : ajouter un utilisateur
router.post('/', async (req, res) => {
  const { nom, email, mot_de_passe, role } = req.body;

  if (!nom || !email || !mot_de_passe) {
    return res.status(400).json({ message: 'Champs obligatoires manquants' });
  }

  try {
    const query = `
      INSERT INTO utilisateurs (nom, email, mot_de_passe, role)
      VALUES ($1, $2, $3, $4) RETURNING id, nom, email, role`;
    const values = [nom, email, mot_de_passe, role || 'client'];
    const result = await pool.query(query, values);

    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error('❌ Erreur POST utilisateurs :', error);
    res.status(500).json({ error: 'Erreur serveur' });
  }
});

module.exports = router;
