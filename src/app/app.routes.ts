import { Routes } from '@angular/router';

export const appRoutes: Routes = [
  {
    path: 'register',
    loadChildren: () =>
      import('./auth/auth.routes').then((m) => m.registerRoutes),
  },
  {
    path: 'login',
    loadChildren: () =>
      import('./auth/auth.routes').then((m) => m.loginRoutes),
  },
  {
    path: '',
    loadChildren: () =>
      import('./components/global-feed/global-feed.routes').then((m) => m.globalFeedRoutes),
  },
  {
    path: 'feed',
    loadChildren: () =>
      import('./components/your-feed/your-feed.routes').then((m) => m.yourFeedRoutes),
  },
  {
    // Dynamic parameter slug
    path: 'tags/:slug',
    loadChildren: () =>
      import('./components/tag-feed/tag-feed.routes').then((m) => m.tagFeedRoutes),
  }
];
