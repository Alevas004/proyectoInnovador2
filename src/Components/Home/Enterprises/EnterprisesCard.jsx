import UserInteraction from "../../Interaction/UserInteraction";
import "./EnterprisesCard.css";
import { useSelector } from "react-redux";

const EnterprisesCard = ({ enterprise }) => {
  const userName = useSelector((store) => store.authSlice.fullName);
  const userspecialty = useSelector((store) => store.authSlice.speciality);

  return (
    <article className="enterprisesCard">
      <header className="enterprisesCard__header">
        <h3 className="enterprisesCard__title">{enterprise.nameCompany}</h3>
        <div className="enterprisesCard__headerDetails">
          <p className="enterprisesCard__sector">Sector: {enterprise.typeSector}</p>
          <div className="enterprisesCard__ownerDetails">
            <p className="ownerName">{userName}</p>
            <p className="ownerSpecialty">{userspecialty}</p>
          </div>
        </div>
      </header>
      <div className="enterprisesCard__body">
        <section className="enterprisesCard__content">
          <p className="enterprisesCard__description">{enterprise.content || "Sin contenido disponible"}</p>
        </section>
        <div className="enterprisesCard__interaction">
          <UserInteraction post={enterprise} />
        </div>
      </div>
    </article>
  );
};

export default EnterprisesCard;
