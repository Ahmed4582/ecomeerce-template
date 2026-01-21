import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  blockProductApi,
  createProductApi,
  deleteProductApi,
  unBlockProductApi,
  updateProductApi,
} from "../api/admin/productsAdminApi";

export const useDeleteProduct = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: deleteProductApi,
    onSuccess: () => qc.invalidateQueries({ queryKey: ["products"] }),
  });
};

export const useBlockProduct = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: blockProductApi,
    onSuccess: () => qc.invalidateQueries({ queryKey: ["products"] }),
  });
};

export const useUnBlockProduct = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: unBlockProductApi,
    onSuccess: () => qc.invalidateQueries({ queryKey: ["products"] }),
  });
};

export const useCreateProduct = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: createProductApi,
    onSuccess: () => qc.invalidateQueries({ queryKey: ["products"] }),
  });
};

export const useUpdateProduct = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: updateProductApi,
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["products"] });
      qc.invalidateQueries({ queryKey: ["product"] });
    },
  });
};

