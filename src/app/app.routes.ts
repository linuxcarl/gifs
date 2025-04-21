import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path:  'dashboard',
    loadComponent: () => import('./gifts/pages/dashboard-page/dashboard-page.component'),
    children:[
      {
        path:  'trending',
        loadComponent: () => import('./gifts/pages/trending-page/trending-page.component'),
      },
      {
        path:  'search',
        loadComponent: () => import('./gifts/pages/search-page/search-page.component'),
      },
      {
        path:  'history/:query',
        loadComponent: () => import('./gifts/pages/gif-history/gif-history.component'),
      },
      {
        path: '**',
        redirectTo: 'trending',
       }
    ]
 },
 {
  path: '**',
  redirectTo: 'dashboard',
 }
];
