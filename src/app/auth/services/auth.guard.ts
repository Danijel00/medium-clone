import { tap } from 'rxjs';
import { Store } from '@ngrx/store';
import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { selectCurrentUser } from '../store/reducers';
import { filter, map } from 'rxjs';

export const AuthGuard: CanActivateFn = (route, state) => {
  const store = inject(Store);
  const router = inject(Router);

  return store.select(selectCurrentUser).pipe(
    filter(currentUser => currentUser !== undefined),
    tap(currentUser => {
      if (currentUser) { // Check if currentUser is truthy (logged in)
        router.navigateByUrl('/feed'); // Redirect to home page if already logged in
      }
    }),
    map(currentUser => !currentUser) // Return false if currentUser is truthy (logged in), true otherwise
  );
};
