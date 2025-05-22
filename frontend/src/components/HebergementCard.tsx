interface HebergementProps {
  id?: number;
  titre: string;
  description?: string;
  lieu?: string;
  prix?: number;
  photo?: string;
}

const HebergementCard: React.FC<HebergementProps> = ({ titre, description, lieu, prix, photo }) => (
  <div className="border p-4 rounded mb-4 shadow">
    {photo && (
      <img
        src={`http://localhost:5000/uploads/${photo}`}
        alt={titre}
        className="w-full h-48 object-cover rounded mb-3"
      />
    )}

    <h2 className="text-xl font-bold">{titre}</h2>
    
    {description && <p>{description}</p>}
    {lieu && <p><strong>Lieu :</strong> {lieu}</p>}
    {prix !== undefined && <p><strong>Prix :</strong> {prix} €</p>}
  </div>
);


export default HebergementCard;
