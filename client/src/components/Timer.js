const Timer = ({ startTime, roundLength }) => {
  return (
    <h1>
      {Math.round(
        (parseFloat(startTime) + roundLength * 1000 - Date.now()) / 1000
      ) + " "}{" "}
      seconds remaining
    </h1>
  );
};

export default Timer;
