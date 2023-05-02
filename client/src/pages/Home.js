import { Button } from "react-bootstrap";

import "../styles/home.css";

const Home = () => {
  return (
    <div className="homepage">
      <h1
        className="heading"
      >
        Cards <br /> Against <br /> Computers.
      </h1>

      <h4 className="sub-heading">
        A party game <br /> for horrible machines.
      </h4>

      <div className="homepage-buttons-container">
        <Button href="/create" className="homepage-button">
          Create a Game 
        </Button>
        <Button href="/join" className="homepage-button">
          Join a Game
        </Button>
      </div>
    </div>
  );
};

export default Home;
