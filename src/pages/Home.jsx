import { useState } from "react";
import Input from "../components/input";
import MultiSelectorHead from "../components/multiSelectPanels/MultiSelectorHead";
import MultiSelect from "../components/multiselect";
import RegionSelector from "../components/regionSelector";
import "./home.css";

const Home = () => {
  const [otherValues, setOtherValues] = useState([]);

  return (
    <div className="homepage px-[73px] py-[47px]">
      <div className="">
        <div className="sectionLabel">Brand Info</div>
        <div className="flex mt-9">
          <div className="w-1/2">
            <Input label="Brand Name" placeholder="Enter brand name" />
          </div>
          <div className="w-1/2 ml-[76px]">
            <MultiSelect label="Category" />
          </div>
        </div>
      </div>
      <div className="mt-[73px]">
        <div className="sectionLabel">
          Select Regions & Marketplaces you are live in:
        </div>
        <div className=" mt-9 w-full">
          <RegionSelector label="Select Regions:" />
          <MultiSelectorHead
            onItemClicked={(item) => {
              if (otherValues?.includes(item.value)) {
                setOtherValues((prev) =>
                  [...prev].filter((x) => x !== item.value)
                );
              } else {
                setOtherValues((prev) => [...prev, item.value]);
              }
            }}
            items={[
              {
                name: "Rest of World",
                value: "rest-of-world",
                isChecked: otherValues.includes("rest-of-world"),
              },
              {
                name: "No International Presence",
                value: "no-international-presence",
                isChecked: otherValues.includes("no-international-presence"),
              },
            ]}
          />
        </div>
      </div>

      <div className="mt-[73px]">
        <div className="sectionLabel">
          Select Regions & Marketplaces you want to go live in:
        </div>
        <div className=" mt-9 w-full">
          <RegionSelector label="Select Regions:" />
        </div>
      </div>
    </div>
  );
};

export default Home;
