import React from "react";

import data from "./regions.json";
import { useState } from "react";

const Regions = () => {
  const [selectedRegion, setselectedRegion] = useState(data?.[0]?.id);
  const [selectedCountry, setSelectedCountry] = useState(null);

  return (
    <div className="regionSelectorContainer">
      <SelectorPanel
        className="justify-between"
        selectedValue={selectedRegion}
        onChange={setselectedRegion}
        items={data.map((x) => ({
          value: x.id,
          name: x.name,
        }))}
      />

      {selectedRegion && (
        <SelectorPanel
          className="countrySelector p-4 mt-4"
          onChange={setSelectedCountry}
          selectedValue={selectedCountry}
          items={
            data
              .find((x) => x.id === selectedRegion)
              ?.countries?.map?.((c) => ({
                value: c.id,
                name: c.name,
              })) || []
          }
        />
      )}

      {selectedCountry && (
        <div className="companies">
          {data
            .find((x) => x.id === selectedRegion)
            ?.countries?.find((x) => x.id === selectedCountry)
            ?.marketplaces?.map((marketp) => (
              <label key={marketp.id}>
                <input type="checkbox" />
                {marketp.name}
              </label>
            ))}
        </div>
      )}
    </div>
  );
};

const SelectorPanel = ({ items, selectedValue = "", onChange, className }) => {
  return (
    <div className={`flex ${className}`}>
      {items.map((item) => (
        <div className="py-0" key={item.value} onClick={() => onChange(item.value)}>
          <input
            type="checkbox"
            {...{ checked: selectedValue === item.value }}
          />
          {item.name} <span>{selectedValue === item.value ? "˰" : "⌄"}</span>
        </div>
      ))}
    </div>
  );
};

export default Regions;
