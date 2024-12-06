import "./Home.css";
import EnterprisesCard from "../../Components/Home/Enterprises/EnterprisesCard";
import { useState } from "react";
import { useGetEntreprises } from "../../hooks/queries/useGetEnterprises";
import PostEntrepreneur from "../../Components/Posts/EntrepreneurPost/EntrepreneurPost";
import { useSelector } from "react-redux";

const Home = () => {
  // Hook para obtener datos con useQuery
  const { data, isLoading, isError } = useGetEntreprises();
  const [isModalOpen, setIsModalOpen] = useState(false);

  //* Validación del rol del usuario
  const userValidation = useSelector((store) => store.authSlice.roles);

  const openModal = () => {
    if (userValidation === "ENTREPRENEUR") {
      setIsModalOpen(true);
    } else {
      alert("Solo los emprendedores y administradores pueden realizar publicaciones");
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  // Ordenar los datos antes de renderizar
  const sortedEnterprises = data
    ? data.sort((a, b) => new Date(b.startDate) - new Date(a.startDate))
    : [];

  return (
    <div className="home__back">
      <div className="home__card">
        <h4>¡Explora, conecta y haz crecer tus ideas!</h4>
        <p>
          Descubre emprendimientos increíbles, eventos destacados y una
          comunidad llena de oportunidades. Aquí, cada clic te acerca a tus
          metas y a personas que comparten tu pasión.
        </p>
        <ul>
          <li>🎯 Publica tus proyectos</li>
          <li>🎉 Promociona tus eventos</li>
          <li>🤝 Conecta con aliados estratégicos</li>
        </ul>
        <p>¡Bienvenido a tu espacio para crecer y triunfar! 🌟</p>

        <button type="button" onClick={openModal} className="">
          PUBLICAR
        </button>
      </div>

      {/* Manejando los estados de carga y errores */}
      {isLoading && <p>Cargando emprendimientos...</p>}
      {!isLoading && isError && <p>Oops, ocurrió un error al cargar los datos.</p>}

      {/* Renderizando las publicaciones con .map */}
      {!isLoading && !isError && data && data.length > 0 && (
        <div className="home__publications">
          {sortedEnterprises.map((enterprise) => (
            <EnterprisesCard key={enterprise.id} enterprise={enterprise} />
          ))}
        </div>
      )}

      {/* Mensaje cuando no hay publicaciones */}
      {!isLoading && !isError && data && data.length === 0 && (
        <p>No hay publicaciones disponibles.</p>
      )}

      {/* Modal para nueva publicación */}
      {isModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={closeModal}>
              &times;
            </span>
            <PostEntrepreneur />
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
