import api from "./axiosClient";

// ================= ATTRIBUTES =================

export const getAttributesApi = () => {
  return api.get("/Attributes/GetAttributes");
};

export const createAttributeApi = (data) => {
  return api.post("/Attributes/CreateAttribute", data);
};

export const updateAttributeApi = (data) => {
  return api.post("/Attributes/UpdateAttribute", data);
};

export const deleteAttributeApi = (id) => {
  return api.post("/Attributes/DeleteAttribute", null, { params: { id } });
};

