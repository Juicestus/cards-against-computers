const Timer = ({ startTime, roundLength }) => {
    console.log(startTime)
  return (
   <h1>{Date.now() - (startTime + roundLength)}</h1>
  );
};

export default Timer;
