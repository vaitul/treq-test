import "./input.css";

const Input = (props) => {
  const input = <input className={`inputBox p-5 ${props.label ? 'mt-4' : ''}`} {...props} />;

  if (!props?.label) return input;

  return (
    <label className="inputLabel flex flex-col">
      {props?.label}
      {input}
    </label>
  );
};

export default Input;
