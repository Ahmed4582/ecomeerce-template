import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createOrderApi,
  deleteOrderApi,
  getOrderDetailsApi,
  getOrdersApi,
  getOrdersCustomerApi,
  updateOrderStatusApi,
} from "../api/ordersApi";

export const useOrders = (params) => {
  return useQuery({
    queryKey: ["orders", params],
    queryFn: () => getOrdersApi(params),
    keepPreviousData: true,
  });
};

export const useCustomerOrders = (params) => {
  return useQuery({
    queryKey: ["ordersCustomer", params],
    queryFn: () => getOrdersCustomerApi(params),
    keepPreviousData: true,
  });
};

export const useOrderDetails = (id) => {
  return useQuery({
    queryKey: ["orderDetails", id],
    queryFn: () => getOrderDetailsApi(id),
    enabled: !!id,
  });
};

export const useUpdateOrderStatus = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: updateOrderStatusApi,
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["orders"] });
      qc.invalidateQueries({ queryKey: ["orderDetails"] });
      qc.invalidateQueries({ queryKey: ["ordersCustomer"] });
    },
  });
};

export const useDeleteOrder = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: deleteOrderApi,
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["orders"] });
      qc.invalidateQueries({ queryKey: ["ordersCustomer"] });
    },
  });
};

export const useCreateOrder = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: createOrderApi,
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["orders"] });
      qc.invalidateQueries({ queryKey: ["ordersCustomer"] });
    },
  });
};

