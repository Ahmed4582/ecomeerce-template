import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteCategoryApi, createCategoryApi, updateCategoryApi } from "../api/admin/categoriesAdminApi";

export const useCreateCategory = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: createCategoryApi,
    onSuccess: () => qc.invalidateQueries({ queryKey: ["categories"] }),
  });
};

export const useUpdateCategory = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: updateCategoryApi,
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["categories"] });
      qc.invalidateQueries({ queryKey: ["category"] });
    },
  });
};

export const useDeleteCategory = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: deleteCategoryApi,
    onSuccess: () => qc.invalidateQueries({ queryKey: ["categories"] }),
  });
};

