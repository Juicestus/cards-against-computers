import Timer from "./Timer";
const Submitted = (props) => {
  return (
    <div>
      <h1 className="submitted-heading"> You finally finished.</h1>
      <h3 className="submitted-sub-heading">
        Wait for the end of the world here.
      </h3>
      <div className="submitted-sub-heading">
        <Timer startTime={props.startTime} roundLength={props.roundLength} />
      </div>
    </div>
  );
};

export default Submitted;
