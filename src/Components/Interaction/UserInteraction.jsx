import axios from "axios";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import "./UserInteraction.css";
import ExpandableText from "./ExpandableText/ExpandableText";
import { getReactionUser } from "../../api/getReaction";
import { Link } from "react-router-dom";

const UserInteraction = ({ post }) => {
  const isLogged = useSelector((store) => store.authSlice.isLogged);
  const [reactions, setReactions] = useState([]);
  const [selectedReaction, setSelectedReaction] = useState("");
  const [reactionCounts, setReactionCounts] = useState(post.reactions || {});
  const [comments, setComments] = useState(post.comments || []);
  const [newComment, setNewComment] = useState("");

  const userThatCommentsName = useSelector((store) => store.authSlice.fullName);
  const userThatCommentsSpeciality = useSelector(
    (store) => store.authSlice.speciality
  );

  // Cargar las reacciones disponibles al montar el componente
  useEffect(() => {
    const loadReactions = async () => {
      try {
        const reactionData = await getReactionUser();
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

  // Enviar reacción seleccionada al backend
  const handleReactionSubmit = async () => {
    if (!selectedReaction) {
      alert("Por favor, selecciona una reacción antes de enviar.");
      return;
    }

    try {
      const response = await axios.post(
        `http://localhost:8080/${post.id}/reactions`,
        { reaction: selectedReaction }
      );

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

  const handleCommentChange = (e) => {
    setNewComment(e.target.value);
  };

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    const updatedComments = [...comments, newComment];
    setComments(updatedComments);
    setNewComment("");

    try {
      const res = await axios.post(
        `http://localhost:8080/${post.id}/commentReaction`,
        { comment: newComment }
      );
      if (res.status !== 200)
        throw new Error("No se pudo agregar el comentario");
      console.log("Comentario agregado exitosamente");
    } catch (error) {
      console.error("Error al agregar comentario:", error);
    }
  };

  return (
    <div className="userInteraction">
      <div className="userInteraction__reactions">
        <h4>Reacciona al Post</h4>
        {isLogged ? (
          <>
               <div className="userInteraction__reactionSelector">
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
      </div>
      <div className="userInteraction__reactionCounts">
        {Object.entries(reactionCounts).map(([reaction, count]) => (
          <div key={reaction} className="reactionItem">
            <span>
              {reaction}: {count}
            </span>
          </div>
        ))}
      </div>
          
          </>
       
      ) : (
        <Link to={'/login'}>Para reaccionar, debes estar autenticado</Link>
      )}
        
      </div>

      <div className="userInteraction__comments">
        <h4>Comentarios</h4>
        <ul className="userInteraction__commentsList">
          {comments.map((comment, index) => (
            <li key={index} className="commentItem">
              <div className="commentAuthor">
                <p className="authorName">{userThatCommentsName}</p>
                <p className="authorSpeciality">{userThatCommentsSpeciality}</p>
              </div>
              <ExpandableText text={comment} maxLength={20} />
            </li>
          ))}
        </ul>
      </div>

      {isLogged ? (
        <div className="userInteraction__commentForm">
          <form onSubmit={handleCommentSubmit}>
            <input
              type="text"
              value={newComment}
              onChange={handleCommentChange}
              placeholder="Añadir un comentario"
            />
            <button type="submit">Enviar</button>
          </form>
        </div>
      ) : (
        <Link to={'/login'}>Para comentar, debes estar autenticado</Link>
      )}
    </div>
  );
};

export default UserInteraction;
