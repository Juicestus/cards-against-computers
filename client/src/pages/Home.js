import { Button } from "react-bootstrap";

const Home = () => {
  return (
    <div className="page">
      <h1 className="home-heading">
        Cards <br /> Against <br /> Computers.
      </h1>

      <h4 className="home-sub-heading">
        A party game <br /> for horrible machines.
      </h4>

      <div className="home-button-container">
        <Button href="/create" className="home-big-button" style ={{display: "flex"}}>
          Create Game
        </Button>
        <Button href="/join" className="home-big-button" style ={{display: "flex"}}>
          Join Game
        </Button>
      </div>
    </div>
  );
};

export default Home;
