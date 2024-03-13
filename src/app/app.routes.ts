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
  },
  {
    path: 'articles/new',
    loadChildren: () =>
      import('./components/article/components/create-article/create-article.routes').then((m) => m.createArticleRoutes),
  },
  {
    path: 'articles/:slug',
    loadChildren: () =>
      import('./components/article/article.routes').then((m) => m.articleRoutes)
  },
  {
    path: 'articles/:slug/edit',
    loadChildren: () =>
      import('./components/article/components/edit-article/edit-article.routes').then((m) => m.editArticleRoutes),
  },
  {
    path: 'settings',
    loadChildren: () =>
      import('./components/settings/settings.routes').then((m) => m.settingsRoutes)
  },
  {
    path: 'profiles/:slug',
    loadChildren: () =>
      import('./components/user-profile/user-profile.routes').then((m) => m.userProfileRoutes)
  },
  {
    path: 'profiles/:slug/favorites',
    loadChildren: () =>
      import('./components/user-profile/user-profile.routes').then((m) => m.userProfileRoutes)
  },
];
