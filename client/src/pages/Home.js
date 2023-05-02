import { Button } from "react-bootstrap";

const Homepage = () => {
  return (
    <div className="homepage">
      <h1 className="header">
        Cards <br /> Against <br /> Computers.
      </h1>

      <h4 className="header" style={{ fontSize: "1em", marginLeft: "1.5em" }}>
        A party game <br/> for horrible people.
      </h4>
      <div
        style={{ display: "flex", justifyContent: "center", marginTop: "1em" }}
      >
        <Button href="/create">Create a Room</Button>
        <Button href="/join" style={{ marginLeft: "1em" }}>
          Join a Room
        </Button>
      </div>
    </div>
  );
};

export default Homepage;
