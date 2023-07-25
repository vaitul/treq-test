import "./input.css";

const Input = (props) => {
  const input = <input className="inputBox bg-slate-500" {...props} />;

  if (!props?.label) return input;

  return (
    <label className="inputLabel">
      {props?.label}
      {input}
    </label>
  );
};

export default Input;
