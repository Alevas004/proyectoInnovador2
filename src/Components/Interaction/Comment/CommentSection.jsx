// Componente para los comentarios
import axios from "axios";
import { useState, useCallback, useEffect } from "react";
import { useSelector } from "react-redux";
import "./CommentSection.css";

const CommentSection = ({ id, comments, setComments }) => {
  const [newComment, setNewComment] = useState("");
  const [allComments, setAllComments] = useState([]); // Estado para almacenar todos los comentarios
  const userId = useSelector((store) => store.authSlice.id);
  const userThatCommentsName = useSelector((store) => store.authSlice.fullName);
  const userThatCommentsSpeciality = useSelector(
    (store) => store.authSlice.speciality
  );

  // Cargar todos los comentarios cuando el componente se monta
  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await axios.get("http://localhost:8080/comment");
        if (response.status === 200) {

          const sortedComments = response.data.sort((a, b) => a.id - b.id);
          setAllComments(sortedComments); // Guarda todos los comentarios
        }
      } catch (error) {
        console.error("Error al cargar los comentarios:", error);
      }
    };

    fetchComments();
  }, []); // Cargar solo una vez al montar el componente

  // Filtrar los comentarios de la publicación actual
  const filteredComments = allComments.filter(comment => comment.publicationId === id);

  // Manejar el cambio del input de comentario
  const handleCommentChange = (e) => {
    setNewComment(e.target.value);
  };

  const postId = id; // Ajustar esto según cómo se pase el ID de publicación

  // Enviar el comentario al backend
  const handleCommentSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      // Validar el contenido del comentario
      if (!newComment.trim()) {
        console.warn("El comentario está vacío.");
        return;
      }

      if (!userId || !postId) {
        console.error("userId o postId no están definidos.");
        return;
      }

      try {
        const response = await axios.post(`http://localhost:8080/comment`, {
          content: newComment,
          userId: userId,
          publicationId: postId,
        });

        if (response.status === 200 || response.status === 201) {
          // Actualiza los comentarios en el estado principal y en el estado local
          setComments((prevComments) => [...prevComments, response.data]);
          setAllComments((prevAllComments) => [...prevAllComments, response.data]);
          setNewComment(""); // Limpiar el campo de texto
        } else {
          throw new Error("No se pudo agregar el comentario");
        }
      } catch (error) {
        console.error("Error al agregar el comentario:", error);
      }
    },
    [newComment, userId, setComments, postId, setAllComments] // Dependencias
  );

  return (
    <div className="commentSection">
      <h4>Comentarios</h4>
      <form onSubmit={handleCommentSubmit} className="commentSection__form">
        <input
          type="text"
          value={newComment}
          onChange={handleCommentChange}
          placeholder="Añadir un comentario"
        />
        <button type="submit">Enviar</button>
      </form>
      <div className="commentSection__commentsList">
        {filteredComments && filteredComments.length > 0 ? (
          filteredComments.sort((a, b) => b.id - a.id).map((comment, index) => (
            <div key={comment.id || index} className="commentItem">
              <div className="commentAuthor">
                <p className="authorName">{userThatCommentsName}</p>
                <p className="authorSpeciality">{userThatCommentsSpeciality}</p>
              </div>
              <p>{comment.userId}</p>
              <p>{comment.content}</p> {/* Renderiza el contenido del comentario */}
            </div>
          ))
        ) : (
          <p>No hay comentarios aún.</p>
        )}
      </div>
    </div>
  );
};

export default CommentSection;
