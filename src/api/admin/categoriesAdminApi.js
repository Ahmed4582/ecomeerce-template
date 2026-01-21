import api from "../axiosClient";

// ================= ADMIN CATEGORIES =================

export const createCategoryApi = ({ category_Id = 0, category_Name_Ar, category_Name_Eng, upload }) => {
  const fd = new FormData();
  fd.append("category_Id", String(category_Id ?? 0));
  fd.append("category_Name_Ar", category_Name_Ar ?? "");
  fd.append("category_Name_Eng", category_Name_Eng ?? "");
  if (upload) fd.append("upload", upload);
  return api.post("/Categories/CreateCategory", fd);
};

export const updateCategoryApi = ({ category_Id, category_Name_Ar, category_Name_Eng, upload }) => {
  const fd = new FormData();
  fd.append("category_Id", String(category_Id ?? 0));
  fd.append("category_Name_Ar", category_Name_Ar ?? "");
  fd.append("category_Name_Eng", category_Name_Eng ?? "");
  if (upload) fd.append("upload", upload);
  return api.post("/Categories/UpdateCategory", fd);
};

export const deleteCategoryApi = (id) => {
  return api.post("/Categories/DeleteCategory", null, { params: { id } });
};

