import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs, setDoc, doc } from "firebase/firestore";
import { deleteDoc } from "firebase/firestore"; // Asegúrate de agregar esta importación


// Tu configuración de Firebase
const firebaseConfig = {
    apiKey: "1:730444874741:web:ec18dac77f0badb10356bc",
    authDomain: "m08-react-nuriarodriguezvindel.firebaseapp.com",
    projectId: "m08-react-nuriarodriguezvindel",
    storageBucket: "m08-react-nuriarodriguezvindel.appspot.com",
    messagingSenderId: "730444874741",
    appId: "1:730444874741:web:ec18dac77f0badb10356bc"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Función para obtener los jugadores favoritos de Firebase
export const getFavoritePlayers = async () => {
    const querySnapshot = await getDocs(collection(db, "favorites"));
    const players = [];
    querySnapshot.forEach((doc) => {
        players.push({ id: doc.id, ...doc.data() });
    });
    return players;
};

// Función para agregar un jugador favorito a Firebase
// firebase.js

export const addFavoritePlayer = async (player) => {
    const docRef = doc(db, "favorites", player.name);  // Aquí usamos el nombre como ID
    await setDoc(docRef, player);
};

// Función para eliminar un jugador favorito de Firebase
export const removeFavoritePlayer = async (playerId) => {
    const playerRef = doc(db, "favorites", playerId); // Usa el id del jugador como referencia
    await deleteDoc(playerRef); // Elimina el documento de Firebase
  };
  


export { db };

