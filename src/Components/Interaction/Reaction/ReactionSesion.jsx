// Componente para las reacciones
import axios from "axios";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import {getReactionUser} from "../../../api/getReaction.js"
import "./ReactionSection.css";

const ReactionSection = ({ post }) => {
  const [reactions, setReactions] = useState([]);
  const [selectedReaction, setSelectedReaction] = useState("");
  const [reactionCounts, setReactionCounts] = useState(post.reactions || {});
  const isLogged = useSelector((store) => store.authSlice.isLogged);

  // Cargar las reacciones disponibles al montar el componente
  useEffect(() => {
    const loadReactions = async () => {
      try {
        const reactionData = await getReactionUser()
        setReactions(reactionData);
      } catch (error) {
        console.error("Error al cargar reacciones:", error);
      }
    };

    loadReactions();
  }, []);

  // Manejar la selección de reacción
  const handleSelectChange = (e) => {
    setSelectedReaction(e.target.value);
  };

  // Enviar la reacción al backend
  const handleReactionSubmit = async () => {
    if (!selectedReaction) {
      alert("Por favor, selecciona una reacción antes de enviar.");
      return;
    }

    try {
      const response = await axios.post(`http://localhost:8080/reactions`, {
        reaction: selectedReaction,
      });

      if (response.status === 200) {
        setReactionCounts((prevCounts) => ({
          ...prevCounts,
          [selectedReaction]: (prevCounts[selectedReaction] || 0) + 1,
        }));
        alert("¡Reacción enviada con éxito!");
        setSelectedReaction("");
      } else {
        throw new Error("Error al enviar la reacción");
      }
    } catch (error) {
      console.error("Error al enviar la reacción:", error);
    }
  };

  return (
    <div className="reactionSection">
      <h4>Reacciona al Post</h4>
      {isLogged ? (
        <div className="reactionSection__container">
          <select value={selectedReaction} onChange={handleSelectChange}>
            <option value="">Selecciona una reacción</option>
            {reactions.map((reaction) => (
              <option key={reaction.id} value={reaction.name}>
                {reaction.name}
              </option>
            ))}
          </select>
          <button onClick={handleReactionSubmit} disabled={!selectedReaction}>
            Enviar Reacción
          </button>
          <div className="reactionSection__counts">
            {Object.entries(reactionCounts).map(([reaction, count]) => (
              <div key={reaction} className="reactionItem">
                <span>
                  {reaction}: {count}
                </span>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <p>Para reaccionar, debes estar autenticado</p>
      )}
    </div>
  );
};

export default ReactionSection;
