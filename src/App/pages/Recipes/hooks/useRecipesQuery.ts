import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { STRAPI_BASE_URL } from 'config/api.config';
import { type RecipesParams } from 'types/Recipes';
import type { Category } from 'types/Recipes';

import { fetchRecipes } from '../api/recipes.api';
export const useRecipesQuery = (params: RecipesParams) => {
  return useQuery({
    queryKey: ['recipes', JSON.stringify(params)],
    queryFn: () => fetchRecipes(params),
    staleTime: 5 * 60 * 1000,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });
};

export const useCategoriesQuery = () => {
  return useQuery({
    queryKey: ['categories'],
    queryFn: async () => {
      const response = await axios.get<{ data: Category[] }>(
        `${STRAPI_BASE_URL}/meal-categories?populate=*`
      );
      return response.data.data;
    },
  });
};
