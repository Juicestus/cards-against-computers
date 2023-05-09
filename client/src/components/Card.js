import CAC from "../imgs/cards-branding.png";
const Card = ({ text }) => {
  return (
    <div className="card" style={{height: "60vh"}}>
      <h1 style={{ color: "black", marginTop: ".5em" }}>{text}</h1>
      <div className="card-branding">
        <img src={CAC} className="small-card-img"></img>
        <h1 className="card-branding-name">
          Cards Against Computers
        </h1>
      </div>
    </div>
  );
};

export default Card;
