import React, { useState, useEffect } from "react";
import { getFavoritePlayers } from "../services/firebase";
import { removeFavoritePlayer } from "../services/firebase";

const FavoritePlayersList = () => {
  const [players, setPlayers] = useState([]);

  useEffect(() => {
    const fetchPlayers = async () => {
      const playersList = await getFavoritePlayers();
      setPlayers(playersList);
    };

    fetchPlayers();
  }, []);

  // Función para eliminar un jugador
  const handleRemove = async (playerId) => {
    await removeFavoritePlayer(playerId); // Elimina el jugador de Firebase
    setPlayers(players.filter(player => player.id !== playerId)); // Actualiza la lista de jugadores
  };

  return (
    <div>
      <h2>Lista de jugadores favoritos</h2>
      {players.length > 0 ? (
        <ul>
          {players.map((player) => (
            <li key={player.id}>
              {player.name} - {player.team}
              <button onClick={() => handleRemove(player.id)}>Eliminar</button> {/* Aquí está el botón para eliminar */}
            </li>
          ))}
        </ul>
      ) : (
        <p>No hay jugadores favoritos aún.</p>
      )}
    </div>
  );
};

export default FavoritePlayersList;

