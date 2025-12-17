import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () => import('./home/home.page').then((m) => m.HomePage),
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    // Додали /:id — це означає, що сюди прийде номер рецепту
    path: 'recipe-details/:id',
    loadComponent: () => import('./pages/recipe-details/recipe-details.page').then( m => m.RecipeDetailsPage)
  },
  {
    path: 'favorites',
    loadComponent: () => import('./pages/favorites/favorites.page').then( m => m.FavoritesPage)
  },
];