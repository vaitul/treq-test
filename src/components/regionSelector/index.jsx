import React, { useEffect, useState } from "react";
import MultiSelectorHead from "../multiSelectPanels/MultiSelectorHead";
import data from "./regions.json";
import "./regionSelector.css";
import CheckBocIcon from "../checkboxIcon";

const RegionSelector = ({ label, onChange }) => {
  const [regionHeadDropDown, setRegionHeadDropDown] = useState();
  const [countryDropDown, setCountryDropDown] = useState();

  const [values, setValues] = useState({});

  useEffect(() => {
    onChange &&
      Object.keys(values).length > 0 &&
      onChange(
        data
          .map((region) => {
            if (!values[region.id]) {
              return undefined;
            }

            return {
              ...region,
              countries: region.countries
                .map((country) => {
                  if (!values[region.id][country.id]) {
                    return undefined;
                  }

                  return {
                    ...country,
                    marketplaces: country.marketplaces.filter((x) =>
                      values[region.id][country.id].includes(x.id)
                    ),
                  };
                })
                .filter(Boolean),
            };
          })
          .filter(Boolean)
      );
  }, [values, onChange]);

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
    <div className="w-full">
      {label && <label className="label mb-4 block">{label}</label>}

      <div className="regionSelectorContainer">
        <MultiSelectorHead
          className="justify-between"
          onItemClicked={(item) => {
            setRegionHeadDropDown(item.value);
            setCountryDropDown(undefined);
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
        {console.log({ regionHeadDropDown, countryDropDown })}
        {!!regionHeadDropDown && !!countryDropDown && (
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
                      !!values?.[regionHeadDropDown]?.[
                        countryDropDown
                      ]?.includes(item.id)
                    }
                  />
                  {item.name}
                </div>
              ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default RegionSelector;
