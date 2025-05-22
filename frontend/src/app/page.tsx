'use client';

import { useEffect, useState } from 'react';
import HebergementCard from '@/components/HebergementCard';
import { fetchHebergements } from '@/lib/api';

export default function HomePage() {
  const [hebergements, setHebergements] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchHebergements()
      .then(setHebergements)
      .catch((err) => console.error('Erreur API :', err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold mb-4">🏡 Hébergements disponibles</h1>
      {loading ? (
        <p>Chargement...</p>
      ) : (
        hebergements.map((h) => (
          <HebergementCard key={h.id} {...h} />
        ))
      )}
    </main>
  );
}
