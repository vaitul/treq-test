import React from "react";
import tickIcon from "../../assets/tick.svg";
import "./checkboxIcon.css";

const CheckBocIcon = ({ className = "", ticked = true }) => {
  return (
    <span
      className={`${className} checkboxIcon flex justify-center items-center ${
        ticked ? "primary-bg" : ""
      }`}
    >
      {ticked && <img src={tickIcon} className="tickIcon" />}
    </span>
  );
};

export default CheckBocIcon;
