import { useEffect, useState } from 'react';
import type { RecipeData } from 'types/Recipes';

import { getSavedRecipes, toggleRecipeStorage } from '../utils/savedRecipes';

export const useSavedRecipe = (recipe: RecipeData) => {
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    const saved = getSavedRecipes().some((r) => r.id === recipe.id);
    setIsSaved(saved);
  }, [recipe.id]);

  const toggleSaved = () => {
    const newState = toggleRecipeStorage(recipe);
    setIsSaved(newState);
  };

  return {
    isSaved,
    toggleSaved,
  };
};
