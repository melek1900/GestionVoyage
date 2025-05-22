'use client';

import { useState, ChangeEvent, FormEvent } from 'react';
import { useRouter } from 'next/navigation';

export default function NouveauHebergement() {
  const router = useRouter();

  const [form, setForm] = useState({
    titre: '',
    description: '',
    lieu: '',
    prix: '',
  });

  const [photo, setPhoto] = useState<File | null>(null);
  const [message, setMessage] = useState('');

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setPhoto(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('titre', form.titre);
    formData.append('description', form.description);
    formData.append('lieu', form.lieu);
    formData.append('prix', form.prix);
    if (photo) {
      formData.append('photo', photo);
    }

    try {
      const res = await fetch('http://localhost:5000/api/hebergements', {
        method: 'POST',
        body: formData,
      });

      if (res.ok) {
        router.push('/'); // ✅ Rediriger après succès
      } else {
        setMessage('❌ Erreur lors de l’ajout');
      }
    } catch (error) {
      console.error('❌ Erreur fetch :', error);
      setMessage('❌ Erreur serveur');
    }
  };

  return (
    <main className="max-w-xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">➕ Ajouter un hébergement</h1>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input type="text" name="titre" value={form.titre} onChange={handleChange} placeholder="Titre" required className="border p-2 rounded" />
        <textarea name="description" value={form.description} onChange={handleChange} placeholder="Description" className="border p-2 rounded" />
        <input type="text" name="lieu" value={form.lieu} onChange={handleChange} placeholder="Lieu" className="border p-2 rounded" />
        <input type="number" name="prix" value={form.prix} onChange={handleChange} placeholder="Prix (€)" required className="border p-2 rounded" />

        <input type="file" accept="image/*" onChange={handleFileChange} className="border p-2 rounded" />

        <button type="submit" className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700">Enregistrer</button>
      </form>

      {message && <p className="mt-4 text-red-600">{message}</p>}
    </main>
  );
}
