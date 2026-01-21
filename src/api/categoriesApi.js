import api from "./axiosClient";

export const getCategories = (params) => {
  return api.get("/Categories/GetCatgories", {
    params,
  });
};

// API to retrieve a single category based on the id
export const getCategory = (id) => {
  return api.get("/Categories/GetCategory", {
    params: { id }, // send the id as a query parameter
  });
};