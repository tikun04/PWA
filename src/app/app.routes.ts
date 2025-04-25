import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '', // when url is empty
    redirectTo: 'home', // go to home page
    pathMatch: 'full' // match the full path only
  },
  {
    path: 'home', // home page route
    loadComponent: () => import('./home/home.page').then(m => m.HomePage) // lazy loadin home page
  },
  {
    path: 'about', // about page route
    loadComponent: () => import('./about/about.page').then(m => m.AboutPage) // lazy load too
  },
  {
    path: 'favorites', // fav page route
    loadComponent: () => import('./favorites/favorites.page').then(m => m.FavoritesPage) // also lazy loaded
  },
  {
    path: '**', 
    redirectTo: 'home' 
  }
];
