import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createAttributeApi,
  deleteAttributeApi,
  getAttributesApi,
  updateAttributeApi,
} from "../api/attributesApi";

export const useAttributes = () => {
  return useQuery({
    queryKey: ["attributes"],
    queryFn: getAttributesApi,
  });
};

export const useCreateAttribute = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: createAttributeApi,
    onSuccess: () => qc.invalidateQueries({ queryKey: ["attributes"] }),
  });
};

export const useUpdateAttribute = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: updateAttributeApi,
    onSuccess: () => qc.invalidateQueries({ queryKey: ["attributes"] }),
  });
};

export const useDeleteAttribute = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: deleteAttributeApi,
    onSuccess: () => qc.invalidateQueries({ queryKey: ["attributes"] }),
  });
};

