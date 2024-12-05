import './AboutUs.css';
import aboutus from "../../img/aboutus.jpg";

const AboutUs = () => {
  return (
    <article className="aboutus-container">
      <h2 className="aboutus-title">Acerca de nosotros</h2>
      <img className="aboutus-image" src={aboutus} alt="Imagen de la plataforma" />
      <p className="aboutus-text">
        Somos una plataforma comunitaria diseñada para conectar emprendedores, administradores y usuarios, promoviendo la colaboración y el crecimiento de los emprendimientos. Nuestra misión es brindar herramientas tecnológicas que impulsen la interacción, visibilidad y éxito de las iniciativas emprendedoras en un entorno digital seguro, escalable y accesible. Creemos en el poder de las comunidades y trabajamos para fortalecerlas a través de soluciones innovadoras.
      </p>
    </article>
  );
};

export default AboutUs;
