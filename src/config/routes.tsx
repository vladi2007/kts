// config/routes.tsx

import type { RouteObject } from "react-router";
import App from '../App'
import Recipes from "../App/pages/Recipes";
import Recipe from '../App/pages/Recipe'
export const routesConfig: RouteObject[] = [
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/recipes',
        element: <Recipes />
      },
      {
        path: '/recipe/:id',
        element: <Recipe />
      }
    ]
  }
];