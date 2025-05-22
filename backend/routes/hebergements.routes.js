const express = require('express');
const router = express.Router();
const pool = require('../models/db');
const multer = require('multer');
const path = require('path');

// Config multer
const storage = multer.diskStorage({
  destination: 'uploads/',
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, Date.now() + ext);
  }
});
const upload = multer({ storage });

// POST avec fichier photo
router.post('/', upload.single('photo'), async (req, res) => {
  const { titre, description, lieu, prix } = req.body;
  const photoPath = req.file ? `/uploads/${req.file.filename}` : null;

  try {
    const result = await pool.query(
      `INSERT INTO hebergements (titre, description, lieu, prix, photos)
       VALUES ($1, $2, $3, $4, $5) RETURNING *`,
      [titre, description, lieu, prix, photoPath ? [photoPath] : []]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error('❌ Erreur ajout hébergement :', err);
    res.status(500).json({ error: 'Erreur serveur' });
  }
});

module.exports = router;
