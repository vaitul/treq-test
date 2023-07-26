import React, {
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import "./multiSelect.css";
import axios from "axios";
import crossIcon from "../../assets/cross.svg";
import downIcon from "../../assets/down.svg";

const MultiSelect = ({ options, selectedItems = [], onChange, ...props }) => {
  const [isDropDownOpen, setIsDropDownOpen] = useState(false);

  // convert from array to object to easy access
  const optionsNormalized = useMemo(
    () =>
      (options || []).reduce(
        (cum, cur) => ({
          ...cum,
          [cur.value]: cur.label,
        }),
        {}
      ),
    [options]
  );

  const selectedItemsContainerRef = useRef();

  // Checking how many preselected items to show by calculating box and window width
  const [selectedOptionsShowingLimit, setSelectedOptionsShowingLimit] =
    useState(options.length);
  useLayoutEffect(() => {
    setSelectedOptionsShowingLimit(selectedItems.length);
    function calculate() {
      let finalLimit = 0;
      if (selectedItemsContainerRef.current) {
        const elm = selectedItemsContainerRef.current;
        const items = elm.getElementsByClassName("selectedItem");
        let remainedWidth = elm.clientWidth - 100;
        if (items.length && remainedWidth) {
          for (let item of items) {
            if (item.clientWidth < remainedWidth) {
              finalLimit++;
              remainedWidth = remainedWidth - item.clientWidth;
            } else {
              break;
            }
          }
        }
      }
      return finalLimit;
    }
    setTimeout(
      () => setSelectedOptionsShowingLimit(calculate() || options.length),
      0
    );
  }, [options.length, selectedItems]);

  const onDropDownClick = () => {
    setIsDropDownOpen((prev) => !prev);
  };

  const onSelectedItemClick = (event, value) => {
    onChange && onChange(selectedItems.filter((x) => x !== value));
    event.stopPropagation();
  };

  const onDropDownItemClicked = (value) => {
    onChange && onChange([...selectedItems, value]);
  };

  const showHiddenItemsCounter =
    selectedItems.length > selectedOptionsShowingLimit;

  return (
    <div className="drp-container-wrapper">
      {props.label && <label className="label mb-4 block">{props.label}</label>}
      <div
        className="drp-container relative p-4"
        {...props}
        onClick={onDropDownClick}
      >
        <div
          ref={selectedItemsContainerRef}
          className="selectedItemsContainer flex"
        >
          {selectedItems.length > 0 ? (
            selectedItems?.slice(0, selectedOptionsShowingLimit)?.map((i) => (
              <div
                onClick={(e) => onSelectedItemClick(e, i)}
                className="selectedItem flex justify-between items-center rounded-full mx-1 last:mr-0 py-2 px-3  text-sm font-medium text-white"
                key={i}
              >
                {optionsNormalized[i]}
                <button className="ml-4">
                  <img className="crossIcon" width={12} src={crossIcon} />
                </button>
              </div>
            ))
          ) : (
            <div className="w-full">{props.placeholder ?? "Select items"}</div>
          )}
          {showHiddenItemsCounter ? (
            <>
              <span className="self-end font-bold">...</span>
              <span className="rounded-lg counter ml-auto text-white self-center">
                {selectedItems.length - selectedOptionsShowingLimit}
              </span>
            </>
          ) : null}
          <button className={`ml-4 ${showHiddenItemsCounter ? "" : "ml-auto"}`}>
            <img
              className={`downIcon ${isDropDownOpen ? "rotate-180" : ""}`}
              src={downIcon}
            />
          </button>
        </div>
        {isDropDownOpen && (
          <div className="dropDownContainer z-50 border py-3 left-0 right-0 rounded-lg mt-5 m-auto shadow-xl absolute">
            {selectedItems.length === options.length ? (
              <div className="pl-2 text-stone-400">No options available</div>
            ) : (
              options?.map((opt) =>
                selectedItems.includes(opt.value) ? null : (
                  <div
                    onClick={() => onDropDownItemClicked(opt.value)}
                    key={opt.value}
                    className="dropDownItems hover:text-white hover:rounded-lg border-b py-2 px-3"
                  >
                    {opt.label}
                  </div>
                )
              )
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default MultiSelect;
