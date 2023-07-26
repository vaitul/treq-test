import downIcon from "../../assets/down.svg";
import "./multiSelectHead.css";
import CheckBocIcon from "../checkboxIcon";

const MultiSelectorHead = ({
  items,
  onItemClicked,
  className,
  activeDropDownValue = "",
}) => {
  return (
    <div
      className={`flex multiSelectHead overflow-auto px-2 py-6 ${className}`}
    >
      {items.map((item) => {
        const isDropDownOpen = activeDropDownValue == item.value;
        return (
          <div
            className="py-0 pl-10 first:pl-0 item flex items-center"
            key={item.label}
            id={item.label}
            onClick={() => onItemClicked(item)}
          >
            <CheckBocIcon ticked={item.isChecked} className="mr-2" />
            <span className="whitespace-nowrap">{item.name}</span>
            <img
              className={`downIcon ml-2 ${isDropDownOpen ? "rotate-180" : ""}`}
              src={downIcon}
            />
          </div>
        );
      })}
    </div>
  );
};

export default MultiSelectorHead;
