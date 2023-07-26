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
        <div className="flex flex-col md:flex-row mt-9">
          <div className="md:w-1/2 w-full">
            <Input label="Brand Name" placeholder="Enter brand name" />
          </div>
          <div className="md:w-1/2 w-full md:mt-0 mt-6 md:ml-[76px] ml-0">
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

      <button className="nextBtn float-right primary-bg text-white mt-7 w-64 py-4 rounded-full">Next</button>
    </div>
  );
};

export default Home;
