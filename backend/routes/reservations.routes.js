const express = require('express');
const router = express.Router();
const pool = require('../models/db');

// 🔹 GET toutes les réservations
router.get('/', async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT r.*, u.nom AS nom_utilisateur, h.titre AS nom_hebergement
      FROM reservations r
      JOIN utilisateurs u ON r.utilisateur_id = u.id
      JOIN hebergements h ON r.hebergement_id = h.id
      ORDER BY r.id DESC
    `);
    res.status(200).json(result.rows);
  } catch (error) {
    console.error('❌ Erreur GET réservations :', error);
    res.status(500).json({ error: 'Erreur serveur' });
  }
});

// 🔹 POST : ajouter une réservation
router.post('/', async (req, res) => {
  const { utilisateur_id, hebergement_id, date_debut, date_fin } = req.body;

  if (!utilisateur_id || !hebergement_id || !date_debut || !date_fin) {
    return res.status(400).json({ message: 'Champs requis manquants' });
  }

  try {
    const query = `
      INSERT INTO reservations (utilisateur_id, hebergement_id, date_debut, date_fin)
      VALUES ($1, $2, $3, $4) RETURNING *`;
    const values = [utilisateur_id, hebergement_id, date_debut, date_fin];
    const result = await pool.query(query, values);

    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error('❌ Erreur POST réservations :', error);
    res.status(500).json({ error: 'Erreur serveur' });
  }
});

module.exports = router;
