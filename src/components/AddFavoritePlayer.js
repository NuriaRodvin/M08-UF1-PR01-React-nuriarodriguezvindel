
import { useState } from "react";
import { addFavoritePlayer } from "../services/firebase"; // Asegúrate de que esta importación sea correcta

const AddFavoritePlayer = () => {
  const [playerName, setPlayerName] = useState('');
  const [playerPosition, setPlayerPosition] = useState('');
  const [playerTeam, setPlayerTeam] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newPlayer = {
      name: playerName,
      position: playerPosition,
      team: playerTeam,
    };

    await addFavoritePlayer(newPlayer); // Llama a la función para agregar el jugador a Firebase
    setPlayerName(''); // Limpia los campos después de agregar el jugador
    setPlayerPosition('');
    setPlayerTeam('');
  };

  return (
    <div>
      <h2>Agregar Jugador Favorito</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Nombre del Jugador:
          <input
            type="text"
            value={playerName}
            onChange={(e) => setPlayerName(e.target.value)}
            required
          />
        </label>
        <label>
          Posición:
          <input
            type="text"
            value={playerPosition}
            onChange={(e) => setPlayerPosition(e.target.value)}
            required
          />
        </label>
        <label>
          Equipo:
          <input
            type="text"
            value={playerTeam}
            onChange={(e) => setPlayerTeam(e.target.value)}
            required
          />
        </label>
        <button type="submit">Agregar</button>
      </form>
    </div>
  );
};

export default AddFavoritePlayer;
