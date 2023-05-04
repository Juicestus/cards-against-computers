import { Button } from "react-bootstrap";

import "../styles/home.css";

const Home = () => {
  return (
    <div className="home-page">
      <h1 className="home-heading">
        Cards <br /> Against <br /> Computers.
      </h1>

      <h4 className="home-sub-heading">
        A party game <br /> for horrible machines.
      </h4>

      <div className="home-button-container">
        <Button href="/create" className="home-big-button">
          Create Game
        </Button>
        <Button href="/join" className="home-big-button">
          Join Game
        </Button>
      </div>
    </div>
  );
};

export default Home;
