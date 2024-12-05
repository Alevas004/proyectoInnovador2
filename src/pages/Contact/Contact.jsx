import "./Contact.css";

const Contact = () => {
  return (
    <article className="contact-container">
      <h2 className="contact-title">Contactanos</h2>
      <div className="cards-container">
        <div className="contact-card">
          <h3 className="card-title"><b>Medellin</b></h3>
          <p className="card-detail"><b>Correo: </b>infomedellin@vce.com</p>
          <p className="card-detail"><b>Direccion: </b>Carrera 70 # 34-10, Edificio Granada, Medellín, Antioquia</p>
          <p className="card-detail"><b>Telefono: </b>(604) 567 8901</p>
          <button className="contact-button">
            <a href="https://api.whatsapp.com/send/?phone=573128363155&text=Hola+quiero+ser+distribuidor.&type=phone_number&app_absent=0">Whatsapp</a>
          </button>
        </div>
        <div className="contact-card">
          <h3 className="card-title"><b>Sucre</b></h3>
          <p className="card-detail"><b>Correo: </b>infosucre@vce.com</p>
          <p className="card-detail"><b>Direccion: </b>Calle 6 # 8-45, Sucre, Sucre</p>
          <p className="card-detail"><b>Telefono: </b>(605) 442 6769</p>
          <button className="contact-button">
            <a href="https://api.whatsapp.com/send/?phone=573128363155&text=Hola+quiero+ser+distribuidor.&type=phone_number&app_absent=0">Whatsapp</a>
          </button>
        </div>
        <div className="contact-card">
          <h3 className="card-title"><b>Bogota</b></h3>
          <p className="card-detail"><b>Correo: </b>infobogota@vce.com</p>
          <p className="card-detail"><b>Direccion: </b>Calle 45 # 18-32, Piso 3, Bogotá, Cundinamarca</p>
          <p className="card-detail"><b>Telefono: </b>(601) 234 5678</p>
          <button className="contact-button">
            <a href="https://api.whatsapp.com/send/?phone=573128363155&text=Hola+quiero+ser+distribuidor.&type=phone_number&app_absent=0">Whatsapp</a>
          </button>
        </div>
      </div>
    </article>
  );
};

export default Contact;
