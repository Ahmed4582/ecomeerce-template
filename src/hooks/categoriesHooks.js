import { useQuery } from "@tanstack/react-query";
import { getCategories, getCategory } from "../api/categoriesApi";

export const useCategories = ({
  pageNumber = 1,
  pageSize = 8,
  search = "",
}) => {
  return useQuery({
    queryKey: ["categories", pageNumber, pageSize, search],
    queryFn: () =>
      getCategories({
        PageNumber: pageNumber,
        PageSize: pageSize,
        search_Value: search,
      }),
    keepPreviousData: true,
  });
};

export const useCategory = (id) => {
  return useQuery({
    queryKey: ["category", id],
    queryFn: () => getCategory(id),
    enabled: !!id,
  });
};
