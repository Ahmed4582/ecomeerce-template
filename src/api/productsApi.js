import api from "./axiosClient";

export const getProducts = (params) => {
  return api.get("/Products/GetProducts", { params });
};

export const getProductDetails = (id) => {
  return api.get("/Products/DetailsProduct", {
    params: { id },
  });
};
