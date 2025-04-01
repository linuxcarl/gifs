import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path:  'dashboard',
    loadComponent: () => import('./gifts/pages/dashboard-page/dashboard-page.component'),
 },{
  path: '**',
  redirectTo: 'dashboard',
 }
];
