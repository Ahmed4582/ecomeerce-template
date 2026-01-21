import api from "../axiosClient";

// ================= ADMIN PRODUCTS =================

export const deleteProductApi = (id) => {
  return api.post("/Products/DeleteProduct", null, { params: { id } });
};

export const blockProductApi = (id) => {
  return api.post("/Products/BlockProduct", null, { params: { id } });
};

export const unBlockProductApi = (id) => {
  return api.post("/Products/UnBlockProduct", null, { params: { id } });
};

// Create/Update are multipart/form-data and depend on backend expectations.
// We provide a helper that matches Swagger:
// - base_Information_Json (string)
// - variants_Json (string)
// - attribute_Ids (array)
// - images (array)
// - cover_Image (binary)

function appendArray(fd, key, values) {
  (values || []).forEach((v) => fd.append(key, v));
}

export const createProductApi = ({
  base_Information,
  variants,
  attribute_Ids,
  images,
  cover_Image,
}) => {
  const fd = new FormData();
  fd.append("base_Information_Json", JSON.stringify(base_Information || {}));
  fd.append("variants_Json", JSON.stringify(variants || []));
  appendArray(fd, "attribute_Ids", (attribute_Ids || []).map(String));
  appendArray(fd, "images", images || []);
  if (cover_Image) fd.append("cover_Image", cover_Image);
  return api.post("/Products/CreateProduct", fd);
};

export const updateProductApi = ({
  base_Information,
  variants,
  images,
  existing_Images,
}) => {
  const fd = new FormData();
  fd.append("base_Information_Json", JSON.stringify(base_Information || {}));
  fd.append("variants_Json", JSON.stringify(variants || []));
  appendArray(fd, "images", images || []);
  if (existing_Images != null) fd.append("existing_Images", String(existing_Images));
  return api.post("/Products/UpdateProduct", fd);
};

