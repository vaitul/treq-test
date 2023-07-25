import "./input.css";

const Input = (props) => {
  const input = (
    <input
      className={`inputBox w-full p-5 ${props.label ? "mt-3" : ""}`}
      {...props}
    />
  );

  if (!props?.label) return input;

  return (
    <label className="inputBox-label w-full flex flex-col">
      {props?.label}
      {input}
    </label>
  );
};

export default Input;
