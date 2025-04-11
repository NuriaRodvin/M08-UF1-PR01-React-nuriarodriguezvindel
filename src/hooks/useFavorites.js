// AddFavoritePlayer.js
import { useState } from "react";
import { addFavoritePlayer } from "../services/firebase";  // Asegúrate de que esta función esté importada correctamente

const AddFavoritePlayer = () => {
  const [name, setName] = useState("");
  const [position, setPosition] = useState("");
  const [team, setTeam] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const player = {
      name,
      position,
      team,
    };
    addFavoritePlayer(player);  // Llama a la función para agregar al jugador a Firebase
    setName("");  // Limpia el campo de nombre después de agregar
    setPosition("");  // Limpia el campo de posición
    setTeam("");  // Limpia el campo de equipo
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>Agregar Jugador Favorito</h3>
      <input
        type="text"
        placeholder="Nombre del Jugador"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="text"
        placeholder="Posición"
        value={position}
        onChange={(e) => setPosition(e.target.value)}
      />
      <input
        type="text"
        placeholder="Equipo"
        value={team}
        onChange={(e) => setTeam(e.target.value)}
      />
      <button type="submit">Agregar</button>
    </form>
  );
};

export default AddFavoritePlayer;






