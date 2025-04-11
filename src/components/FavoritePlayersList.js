import React, { useState, useEffect } from "react";
import { getFavoritePlayers, removeFavoritePlayer } from "../services/firebase";
import { ClipLoader } from "react-spinners"; // Importamos el spinner para el loading

const FavoritePlayersList = () => {
  const [players, setPlayers] = useState([]);
  const [loading, setLoading] = useState(true); // Estado para saber si estamos cargando los jugadores

  useEffect(() => {
    const fetchPlayers = async () => {
      const playersList = await getFavoritePlayers();
      setPlayers(playersList);
      setLoading(false); // Establece loading a false después de que se hayan cargado los jugadores
    };

    fetchPlayers();
  }, []);

  // Función para eliminar un jugador
  const handleRemove = async (playerId) => {
    await removeFavoritePlayer(playerId);  // Elimina el jugador de Firebase
    setPlayers(players.filter(player => player.id !== playerId));  // Actualiza la lista de jugadores
  };

  // Función para exportar la lista de jugadores
  const handleExport = () => {
    const data = players.map(player => ({
      name: player.name,
      position: player.position,
      team: player.team
    }));

    const csvContent = "data:text/csv;charset=utf-8,"
      + "Nombre,Posición,Equipo\n" 
      + data.map(player => `${player.name},${player.position},${player.team}`).join("\n");

    // Crear un enlace para descargar el CSV
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "jugadores_favoritos.csv");
    document.body.appendChild(link);
    link.click(); // Simula el clic para descargar el archivo
  };

  return (
    <div>
      <h2>Lista de jugadores favoritos</h2>
      {loading ? (
        <ClipLoader size={50} color={"#007bff"} loading={loading} />
      ) : players.length > 0 ? (
        <>
          <ul>
            {players.map((player) => (
              <li key={player.id}>
                {player.name} - {player.team}
                <button onClick={() => handleRemove(player.id)}>Eliminar</button>
              </li>
            ))}
          </ul>
          <button onClick={handleExport}>Exportar Lista</button> {/* Botón para exportar */}
        </>
      ) : (
        <p>No hay jugadores favoritos aún.</p>
      )}
    </div>
  );
};

export default FavoritePlayersList;


