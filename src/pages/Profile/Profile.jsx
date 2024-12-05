import { useSelector } from "react-redux";
import "./Profile.css"; 

const Profile = () => {

  const { fullName, experience, speciality, contact, email, city, roles } = useSelector(
    (store) => store.authSlice
  );

  return (
    <section className="profile-container">
      <div className="profile-header">
        <h3>{`Bienvenido ${fullName}`}</h3>
        <p className="profile-roles">Rol(s): {roles}</p>
      </div>
      
      <div className="profile-contact">
        <h4>Información de Contacto</h4>
        <ul>
          <li>Email: {email}</li>
          <li>Teléfono: {contact}</li>
          <li>Ciudad: {city}</li>
        </ul>
      </div>

      <div className="profile-experience">
        <h4>Especialidad y Experiencia</h4>
        <p><strong>Especialidad:</strong> {speciality}</p>
        <p><strong>Experiencia:</strong> {experience}</p>
      </div>
    </section>
  );
};

export default Profile;
