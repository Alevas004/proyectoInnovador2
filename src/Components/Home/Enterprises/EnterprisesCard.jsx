import UserInteraction from "../../Interaction/UserInteraction";
import "./EnterprisesCard.css";
import { useSelector } from "react-redux";
import fofo1 from "../../../img/fofo1.jpg";

const EnterprisesCard = ({ enterprise }) => {
  const userName = useSelector((store) => store.authSlice.username);
  const userspecialty = useSelector((store) => store.authSlice.speciality);

  console.log(enterprise);

  return (
    <article className="enterprisesCard">
      <header className="enterprisesCard__header">
        <div>
          <h3 className="enterprisesCard__title">{enterprise.receivedInvestment}</h3>
        </div>
        <div className="enterprisesCard__headerDetails">
          <div className="enterprisesCard__ownerDetails2">
            <p className="ownerName"> <strong>Compañia:</strong> {enterprise.nameCompany} </p>
            <p className="ownerSpecialty">
              <strong>Sector:</strong> {enterprise.typeSector}
            </p>
          </div>
          <div className="enterprisesCard__ownerDetails">
            <p className="ownerName"><strong>Usuario: </strong>{userName}</p>
            <p className="ownerSpecialty"><strong>Especialidad: </strong>{userspecialty}</p>
          </div>
        </div>
      </header>
      <div className="enterprisesCard__body">
        <section className="enterprisesCard__content">
          <div className="enterpriseCard__img">
            <img src={enterprise.image} alt={enterprise.nameCompany} />
          </div>
          <p className="enterprisesCard__description">
            {enterprise.content || "Sin contenido disponible"}
          </p>
        </section>
        <div className="enterprisesCard__interaction">
          <UserInteraction post={enterprise} />
        </div>
      </div>
    </article>
  );
};

export default EnterprisesCard;
