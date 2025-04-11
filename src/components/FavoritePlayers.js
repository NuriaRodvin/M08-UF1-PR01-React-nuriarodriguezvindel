import { useState, useEffect } from "react";
import { getDocs, collection } from "firebase/firestore";
import { db, AddFavoritePlayer } from "../services/firebase";  // Asegúrate de importar addFavoritePlayer

const FavoritePlayers = () => {
  const [favorites, setFavorites] = useState([]);

  const getFavorites = async () => {
    const querySnapshot = await getDocs(collection(db, "favorites"));
    const favoritesList = querySnapshot.docs.map((doc) => doc.data());
    setFavorites(favoritesList);
  };

  const addToFavorites = (player) => {
    // Llama a la función para agregar el jugador a Firebase
    AddFavoritePlayer(player);  // Llamar a la función para agregar el jugador a Firebase
  };

  useEffect(() => {
    getFavorites(); // Llama a la función al cargar el componente
  }, []);

  return (
    <div>
      <h2>Jugadores favoritos</h2>
      {favorites.length > 0 ? (
        <ul>
          {favorites.map((player) => (
            <li key={player.id}>
              {player.name} - {player.team}
              <button onClick={() => addToFavorites(player)}>Añadir</button>
            </li>
          ))}
        </ul>
      ) : (
        <p>No hay jugadores favoritos aún.</p>
      )}
    </div>
  );
};

export default FavoritePlayers;

