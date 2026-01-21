import api from "./axiosClient";

// ================= ORDERS =================

export const getOrdersApi = (params) => {
  return api.get("/Orders/GetOrders", { params });
};

export const getOrdersCustomerApi = (params) => {
  return api.get("/Orders/GetOrdersCustomer", { params });
};

export const getOrderDetailsApi = (id) => {
  return api.get("/Orders/OrderDetails", { params: { id } });
};

export const updateOrderStatusApi = ({ orderid, Status }) => {
  return api.post("/Orders/UpdateStatusOrder", null, {
    params: { orderid, Status },
  });
};

export const deleteOrderApi = (id) => {
  return api.post("/Orders/DeleteOrder", null, { params: { id } });
};

export const createOrderApi = ({ amount, products, notes, shipping_Address }) => {
  const fd = new FormData();
  if (amount != null) fd.append("amount", String(amount));
  // Swagger defines `products` as array inside multipart/form-data.
  // The most compatible approach is sending repeated `products` keys,
  // each item as JSON string (Add object item in Swagger UI).
  (products || []).forEach((p) => {
    fd.append("products", JSON.stringify(p));
  });
  if (notes != null) fd.append("notes", String(notes));
  if (shipping_Address != null) fd.append("shipping_Address", String(shipping_Address));
  return api.post("/Orders/CreateOrder", fd);
};

