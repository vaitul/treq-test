import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const slice = createSlice({
  name: "category",
  initialState: {
    status: "idle", // idle, loading, error, fetched
    data: null,
    error: null,
  },
  reducers: {
    fetchData(state, payload) {
      state.status = "loading";
      state.error = null;
    },
    fetched(state, { payload }) {
      state.data = payload;
      state.status = "fetched";
    },
    gotError(state, { payload }) {
      state.status = "error";
      state.error = payload;
      state.data = null;
    },
  },
});

export const fetchData = () => (dispatch) => {
  dispatch(slice.actions.fetchData());
  return axios
    .get(
      "http://goglocal-stage-lb-1590125154.ap-south-1.elb.amazonaws.com/brand/category",
      {
        headers:
          "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjkwNzgxNzA0LCJpYXQiOjE2ODk5MTc3MDQsImp0aSI6ImViN2Q5NjFlYzI4NDQyOGY4YjVkMTAzN2MwOGE5ZjZmIiwidXNlcl9pZCI6MX0.xezhJiR8hSFp7AiHkX_5t8IsADbfhIGZLgzxxJzpvuk",
      }
    )
    .then(({ data }) => {
      if (data.status === "success") {
        dispatch(slice.actions.fetched(data.data));
      } else {
        dispatch(slice.actions.gotError(data.message));
      }
    })
    .catch((error) => dispatch(slice.actions.gotError(error?.message)));
};

export const categoryReducer = slice.reducer;
