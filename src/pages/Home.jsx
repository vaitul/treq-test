import { useEffect, useState } from "react";
import Input from "../components/input";
import MultiSelectorHead from "../components/multiSelectPanels/MultiSelectorHead";
import MultiSelect from "../components/multiselect";
import RegionSelector from "../components/regionSelector";
import "./home.css";
import { useDispatch, useSelector } from "react-redux";
import { fetchData } from "../_redux/slices/categorySlice";

const Home = () => {
  const dispatch = useDispatch();
  const categoryState = useSelector((s) => s.category || {});

  const [otherValues, setOtherValues] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([1, 2, 3]);
  const [brandName, setBrandName] = useState("");
  const [regionMarketLiveIn, setRegionMarketLiveIn] = useState(null);
  const [regionMarketWantLiveIn, setRegionMarketWantLiveIn] = useState(null);

  const [isFormSubmitted, setIsFormSubmitted] = useState(false);

  useEffect(() => {
    dispatch(fetchData());
  }, []);

  const submitButton = (
    <div className={isFormSubmitted ? "" : "text-right"}>
      <button
        onClick={() => setIsFormSubmitted((p) => !p)}
        className="nextBtn primary-bg text-white mt-7 w-64 py-4 rounded-full"
      >
        {isFormSubmitted ? "Back" : "Next"}
      </button>
    </div>
  );

  if (isFormSubmitted)
    return (
      <div className="p-5">
        <code>
          <pre>
            {JSON.stringify(
              {
                brandName,
                selectedCategories,
                regionMarketLiveIn,
                otherRegionOptions: otherValues,
                regionMarketWantLiveIn,
              },
              null,
              "  "
            )}
          </pre>
        </code>
        {submitButton}
      </div>
    );

  return (
    <div className="homepage px-[73px] py-[47px]">
      <div className="">
        <div className="sectionLabel">Brand Info</div>
        <div className="flex flex-col md:flex-row mt-9">
          <div className="md:w-1/2 w-full">
            <Input
              value={brandName}
              onChange={(e) => setBrandName(e.target.value)}
              label="Brand Name"
              placeholder="Enter brand name"
            />
          </div>
          <div className="md:w-1/2 w-full md:mt-0 mt-6 md:ml-[76px] ml-0">
            <MultiSelect
              onChange={setSelectedCategories}
              selectedItems={
                categoryState.status === "fetched" ? selectedCategories : []
              }
              options={
                categoryState.status !== "fetched"
                  ? []
                  : categoryState.data?.map((item) => ({
                      label: item.name,
                      value: item.id,
                    }))
              }
              label="Category"
              placeholder={
                categoryState.status === "loading"
                  ? "Fetching Categories..."
                  : "Select items"
              }
            />
            {categoryState.status === "error" && categoryState.error && (
              <span className="text-red-600 pl-2">{categoryState.error}</span>
            )}
          </div>
        </div>
      </div>
      <div className="mt-[73px]">
        <div className="sectionLabel">
          Select Regions & Marketplaces you are live in:
        </div>
        <div className=" mt-9 w-full">
          <RegionSelector
            onChange={setRegionMarketLiveIn}
            label="Select Regions:"
          />
          <MultiSelectorHead
            className="mt-5"
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
          <RegionSelector
            onChange={setRegionMarketWantLiveIn}
            label="Select Regions:"
          />
        </div>
      </div>

      {submitButton}
    </div>
  );
};

export default Home;
