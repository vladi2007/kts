import axios from 'axios';
import { STRAPI_BASE_URL } from 'config/api.config';
import qs from 'qs';
import { type RecipeData } from 'types/Recipes';
import { type RecipesParams } from 'types/Recipes';

export const fetchRecipes = async (params: RecipesParams) => {
  const { search, categories, page, pageSize } = params;

  const query = qs.stringify({
    populate: ['images', 'ingradients'],
    pagination: { page, pageSize },
    filters: {
      ...(search && { name: { $containsi: search } }),
      ...(categories?.length ? { category: { id: { $in: categories } } } : {}),
    },
  });

  const response = await axios.get<{ data: RecipeData[] }>(`${STRAPI_BASE_URL}/recipes?${query}`);

  return {
    recipes: response.data.data,
    meta: response.data.meta,
  };
};
