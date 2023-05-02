import { Button } from "react-bootstrap";

const Homepage = () => {
  return (
    <div className="homepage">
      <h1
        style={{
          fontSize: "4em",
          color: "white",
          alignItems: "center",
          flexDirection: "column",
          display: "flex",
        }}
      >
        Cards <br /> Against <br /> Computers.
      </h1>

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginTop: "5em",
          flexDirection: "column",
          marginRight: "2em",
          marginLeft: "2em",
        }}
      >
        <Button href="/create" className="homepage-buttons">
          Create a Room
        </Button>
        <Button
          href="/join"
          className="homepage-buttons"
          style={{
            marginTop: "1em",
          }}
        >
          Join a Room
        </Button>
      </div>
    </div>
  );
};

export default Homepage;
