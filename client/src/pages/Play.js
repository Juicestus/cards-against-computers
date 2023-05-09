import { Carousel, Button } from "react-bootstrap";
import Card from "../components/Card";
import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";

const Play = () => {
  const [answerCards, setAnswerCards] = useState([
    "7 dollars and a Popeyes biscuit",
    "The 3/5ths Compromise",
    "Stoicism is the purest form of masculinity",
  ]);
  const [questionCards, setQuestionCards] = useState([
    "The best way to get arrested is to",
    "My favorite thing to do on a Friday night is",
    "I can't believe I got fired for",
  ]);

  const [questionCard, setQuestionCard] = useState(0);

  useEffect(() => {
    setQuestionCard(
      questionCards[Math.floor(Math.random() * questionCards.length)]
    );
  }, []);

  return (
    <div>
      <h2 className="create-join-back">
        <NavLink to="/">{"←"}</NavLink>
      </h2>
      <h1 className="prompt">{questionCard} _____.</h1>
      <div className="card-carousel">
        <Carousel interval={null}>
          {answerCards.map((card) => (
            <Carousel.Item>
              <Card text={card} />
            </Carousel.Item>
          ))}
        </Carousel>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: "1em",
          }}
        >
          <Button>Submit</Button>
        </div>
      </div>
    </div>
  );
};

export default Play;
