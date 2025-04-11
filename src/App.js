import React, { useState } from "react";
import "./App.css"; // Asegúrate de que el archivo CSS está importado
import AddFavoritePlayer from "./components/AddFavoritePlayer";
import FavoritePlayersList from "./components/FavoritePlayersList";

function App() {
  const [players, setPlayers] = useState([]);

  const addPlayer = (player) => {
    setPlayers([...players, player]);
  };

  return (
    <div className="app-container">
      <h1>NBA Rookie App</h1>
      <AddFavoritePlayer addPlayer={addPlayer} />
      <FavoritePlayersList players={players} />
    </div>
  );
}

export default App;




