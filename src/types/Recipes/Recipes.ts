export type ImageFormat = {
  url: string;
  width?: number;
  height?: number;
};

export type Image = {
  id: number;
  formats?: {
    small?: ImageFormat;
    medium?: ImageFormat;
    large?: ImageFormat;
    thumbnail?: ImageFormat;
  };
};

export type Ingredient = {
  id: number;
  name: string;
  amount: number;
  unit: string;
};

export type Equipment = {
  id: number;
  name: string;
};

export type Direction = {
  id: number;
  description: string;
};

export type RecipeData = {
  id: number;
  documentId: string;
  name: string;
  summary: string;
  totalTime: number;
  preparationTime: number;
  cookingTime: number;
  servings: number;
  rating: number;
  likes: number;
  calories: number;
  images: Image[];
  ingradients: Ingredient[];
  equipments: Equipment[];
  directions: Direction[];
};
