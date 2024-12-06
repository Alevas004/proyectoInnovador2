import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getSpeciality } from "../../../api/getSpeciality";
import "./EntrepreneurPost.css";
import { useNavigate } from "react-router-dom";

const PostEntrepreneur = () => {
  const userId = useSelector((store) => store.authSlice.id);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    nameCompany: "",
    receivedInvestment: "",
    typeSector: "",
    userId: userId || "",
    content: "",
    image: "",
  });

  const [specialty, setSpecialty] = useState([]);

  // Actualizar formData cuando userId cambie
  useEffect(() => {
    if (userId) {
      setFormData((prev) => ({ ...prev, userId }));
    }
  }, [userId]);

  useEffect(() => {
    const loadSpecialty = async () => {
      try {
        const res = await getSpeciality();
        setSpecialty(res);
      } catch (error) {
        console.error("Error al cargar especialidades:", error.message);
      }
    };
    loadSpecialty();
  }, []);

  const isValidUrl = (url) => {
    try {
      new URL(url);
      return true;
    } catch (_) {
      return false;
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {

    if (!isValidUrl(formData.image)) {
      alert("Por favor ingresa una URL válida para la imagen.");
      return;
    }
    e.preventDefault();

    const url = "http://localhost:8080/entrepreneurShip";

    const payload = {
      nameCompany: formData.nameCompany,
      receivedInvestment: formData.receivedInvestment,
      typeSector: formData.typeSector,
      userId: formData.userId,
      content: formData.content, // Se puede ajustar si el backend requiere un valor distinto
      reactionType: null, // Se puede ajustar si el backend requiere un valor distinto
      image: formData.image,
    };

    try {
      const response = await axios.post(url, payload, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.status === 200 || response.status === 201) {
        console.log("Publicación creada exitosamente:", response.data);
        alert("Publicación creada exitosamente");
        setFormData({
          nameCompany: "",
          receivedInvestment: "",
          typeSector: "",
          userId: userId || "",
          content:"",
          image: ""
        });
        navigate("/");
      }
    } catch (error) {
      console.error(
        "Error al crear la publicación:",
        error.response?.data || error.message
      );
      alert("Ocurrió un error al crear la publicación.");
    }
  };

  return (
    <form className="entrepreneurForm" onSubmit={handleSubmit}>
      <h2>Crea una publicacion</h2>

      <div className="inputGroup">
        <label htmlFor="nameCompany">Nombre de la Empresa</label>
        <input
          type="text"
          id="nameCompany"
          name="nameCompany"
          value={formData.nameCompany}
          onChange={handleInputChange}
          required
        />
      </div>

      <div className="inputGroup">
        <label htmlFor="receivedInvestment">Titulo de la publicacion</label>
        <input
          type="string"
          id="receivedInvestment"
          name="receivedInvestment"
          value={formData.receivedInvestment}
          onChange={handleInputChange}
          required
        />
      </div>

      <div className="inputGroup">
        <label htmlFor="typeSector">Sector</label>
        <select
          id="typeSector"
          name="typeSector"
          value={formData.typeSector}
          onChange={handleInputChange}
          required
        >
          <option value="">Seleccione un sector</option>
          {specialty.map((s) => (
            <option key={s.id} value={s.name}>
              {s.name}
            </option>
          ))}
        </select>
      </div>

      <div className="inputGroup">
        <label htmlFor="image">Imagen de la publicacion (URL)</label>
        <input
          type="url"
          id="image"
          name="image"
          value={formData.image}
          onChange={handleInputChange}
          required
        />
      </div>

      
      
      
      

      <div className="inputGroup">
        <textarea
          className="xp"
          name="content"
          id="content"
          rows="4"
          cols="50"
          placeholder="Detalles de la publicacion..."
          value={formData.content || ""}
          onChange={handleInputChange}
          required
        ></textarea>
        <label className="inputGroupLabel" htmlFor="content"></label>
      </div>

      <div className="buttonContainer">
        <button type="submit">Crear Publicación</button>
      </div>
    </form>
  );
};

export default PostEntrepreneur;
