import React, { useState } from "react";
import MultiSelectorHead from "../multiSelectPanels/MultiSelectorHead";
import MultiSelectorLeafPanels from "../multiSelectPanels/MultiSelectorLeafPanels";
import data from "./regions.json";
import "./regionSelector.css";
import CheckBocIcon from "../checkboxIcon";

const RegionSelector = () => {
  const [regionHeadDropDown, setRegionHeadDropDown] = useState(data?.[0]?.id);
  const [countryDropDown, setCountryDropDown] = useState(
    data?.[0]?.countries?.[0]?.id
  );

  const [values, setValues] = useState({});

  const onMarketPlaceClicked = (regionId, countryId, item) => {
    if (values?.[regionHeadDropDown]?.[countryDropDown]?.includes(item.id)) {
      setValues((prev) => {
        const newState = JSON.parse(JSON.stringify(prev));
        const index = newState?.[regionHeadDropDown]?.[countryDropDown].indexOf(
          item.id
        );
        if (index !== -1) {
          newState?.[regionHeadDropDown]?.[countryDropDown].splice(index, 1);
        }
        return newState;
      });
    } else {
      setValues((prev) => {
        let t = { ...prev };
        t[regionId] = t[regionId] || {};
        t[regionId][countryId] = t[regionId][countryId] || [];
        t[regionId][countryId] = [
          ...new Set([...t[regionId][countryId], item.id]),
        ];
        return t;
      });
    }
  };

  return (
    <div className="regionSelectorContainer">
      <MultiSelectorHead
        className="justify-between"
        onItemClicked={(item) => {
          setRegionHeadDropDown(item.value);
          setCountryDropDown(
            data.find((x) => x.id === item.value)?.countries?.[0]
          );
        }}
        items={data.map((x) => ({
          value: x.id,
          name: x.name,
          isChecked: !!x.countries.find(
            (y) => values?.[x.id]?.[y.id]?.length > 0
          ),
        }))}
        activeDropDownValue={regionHeadDropDown}
      />
      {regionHeadDropDown && (
        <MultiSelectorHead
          className="countrySelector p-4"
          onItemClicked={(item) => setCountryDropDown(item.value)}
          items={
            data
              .find((x) => x.id === regionHeadDropDown)
              ?.countries?.map?.((c) => ({
                value: c.id,
                name: c.name,
                isChecked: !!c.marketplaces.find((y) =>
                  values?.[regionHeadDropDown]?.[c.id]?.includes(y.id)
                ),
              })) || []
          }
          activeDropDownValue={countryDropDown}
        />
      )}
      {console.log(
        data
          .find((x) => x.id === regionHeadDropDown)
          ?.countries?.find((x) => x.id === countryDropDown)?.marketplaces
      )}
      {regionHeadDropDown && countryDropDown && (
        <div className="marketplaceContainer w-full gap-2 grid p-5">
          {data
            .find((x) => x.id === regionHeadDropDown)
            ?.countries?.find((x) => x.id === countryDropDown)
            ?.marketplaces?.map((item) => (
              <div
                onClick={() =>
                  onMarketPlaceClicked(
                    regionHeadDropDown,
                    countryDropDown,
                    item
                  )
                }
                key={item.id + item.name}
                className="flex items-center"
              >
                <CheckBocIcon
                  className="mr-3"
                  ticked={
                    !!values?.[regionHeadDropDown]?.[countryDropDown]?.includes(
                      item.id
                    )
                  }
                />
                {item.name}
              </div>
            ))}
        </div>
      )}
    </div>
  );
};

export default RegionSelector;
