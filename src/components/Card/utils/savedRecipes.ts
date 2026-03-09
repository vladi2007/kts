import type { RecipeData } from 'types/Recipes';

import { STORAGE_KEY } from '../Card.config';

export const getSavedRecipes = (): RecipeData[] => {
  const stored = localStorage.getItem(STORAGE_KEY);
  return stored ? JSON.parse(stored) : [];
};

export const toggleRecipeStorage = (recipe: RecipeData): boolean => {
  const recipes = getSavedRecipes();
  const exists = recipes.some((r) => r.id === recipe.id);

  if (exists) {
    const updated = recipes.filter((r) => r.id !== recipe.id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    return false;
  }
  localStorage.setItem(STORAGE_KEY, JSON.stringify([...recipes, recipe]));
  return true;
};
