import React, { useEffect, useState } from "react";
import "./multiSelect.css";
import axios from "axios";

const MultiSelect = (props) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios
      .get(
        "http://goglocal-stage-lb-1590125154.ap-south-1.elb.amazonaws.com/brand/category",
        {
          headers: {
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjkwNzgxNzA0LCJpYXQiOjE2ODk5MTc3MDQsImp0aSI6ImViN2Q5NjFlYzI4NDQyOGY4YjVkMTAzN2MwOGE5ZjZmIiwidXNlcl9pZCI6MX0.xezhJiR8hSFp7AiHkX_5t8IsADbfhIGZLgzxxJzpvuk",
          },
        }
      )
      .then((res) => {
        res.data.status === "success" ? setData(res.data.data) : null;
      });
  }, []);

  return (
    <select className="drp-container p-4" {...props}>
      {data?.map((item) => (
        <option className="item" key={item.id}>
          {item.name}
        </option>
      ))}
    </select>
  );
};

export default MultiSelect;
