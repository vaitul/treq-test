import React from "react";

const MultiSelectorLeafPanels = ({ options }) => {
  return (
    <div className="companies">
      {options.map((opt) => (
        <label key={opt.value}>
          <input type="checkbox" />
          {opt.label}
        </label>
      ))}
    </div>
  );
};

export default MultiSelectorLeafPanels;
