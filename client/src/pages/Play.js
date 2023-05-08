import { Carousel, Button } from "react-bootstrap";
import Card from "../components/Card";
import { useState, useEffect } from "react";
const Play = () => {
  const [index, setIndex] = useState(0);
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
    const statusKeyboardInput = (e) => {
      if (e.keyCode === 39)
        setIndex(Math.min(index + 1, answerCards.length - 1));
      else if (e.keyCode === 37) setIndex(Math.max(0, index - 1));
    };

    window.addEventListener("keydown", statusKeyboardInput);
    return () => window.removeEventListener("keydown", statusKeyboardInput);
  });

  useEffect(() => {
    setQuestionCard(
      questionCards[Math.floor(Math.random() * questionCards.length)]
    );
  }, []);

  return (
    <div>
      <h1 className="prompt">{questionCard}{" "} _____.</h1>
      <div className="card-carousel">
        <Carousel
          interval={null}
          controls={false}
          activeIndex={index}
          slide={false}
        >
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
          <Button>Select?</Button>
        </div>
      </div>
    </div>
  );
};

export default Play;
