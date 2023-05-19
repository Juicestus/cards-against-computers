import { Carousel, Button } from "react-bootstrap";
import Card from "./Card";
import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";

const Play = (props) => {

  const [sectedIndex, setSelectedIndex] = useState(0);
  const [cards, setCards] = useState([]);

  useEffect(() => {
    setCards(Object.values(props.responses));
  }, [props.responses, setCards]);

  const onSubmit = () => {
    props.submitConsumer(cards[sectedIndex]);
  };

  return (
    <div>
      <h1 className="prompt">{props.prompt}</h1>
      <div className="card-carousel">
        <Carousel interval={null} className="card-carousel" onSlide={setSelectedIndex}>
          {cards.map(response => (
            <Carousel.Item>
              <Card text={response} />
            </Carousel.Item>
          ))}
        </Carousel>
        {/* wtf does the div below do*/}
        <div 
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: "1em",
          }}
        >
          {props.showButtons ? <Button onClick={onSubmit}>Submit</Button> : <div></div>}
        </div>
      </div>
    </div>
  );
};

export default Play;
