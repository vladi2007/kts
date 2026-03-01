// config/routes.tsx

import type { RouteObject } from 'react-router';

import App from '../App';
import Recipe from '../App/pages/Recipe';
import Recipes from '../App/pages/Recipes';
export const routesConfig: RouteObject[] = [
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/recipes',
        element: <Recipes />,
      },
      {
        path: '/recipe/:id',
        element: <Recipe />,
      },
    ],
  },
];
