import { Store, select } from '@ngrx/store';
import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { BackendErrorMessageComponent } from '../../shared/components/backend-error-message/backend-error-message.component';
import { Subscription, combineLatest, filter } from 'rxjs';
import { selectIsSubmitting, selectValidationErrors } from './store/reducerts';
import { selectCurrentUser } from '../../auth/store/reducers';
import { CurrentUserInterface } from '../../shared/types/currentUser.interface';
import { authActions } from '../../auth/store/actions';
import { CurrentUserRequestInterface } from '../../shared/types/currentUserRequest.interface';

@Component({
  selector: 'mc-settings',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, BackendErrorMessageComponent],
  templateUrl: './settings.component.html',
  styleUrl: '../../shared/styles/form.component.scss'
})
export class SettingsComponent implements OnInit, OnDestroy {
  private currentUserSub: Subscription | undefined;
  public currentUser?: CurrentUserInterface;

  public form = this.fb.nonNullable.group({
    image: '',
    username: '',
    bio: '',
    email: '',
    password: '',
  })

  public data$ = combineLatest({
    isSubmitting: this.store.select(selectIsSubmitting),
    backendErrors: this.store.select(selectValidationErrors),
  })

  constructor(private fb: FormBuilder, private store: Store) { }

  ngOnInit(): void {
    this.currentUserSub = this.store.pipe(select(selectCurrentUser),
      // Filter out null and undefined boolean values
      filter(Boolean)).subscribe((currentUser: CurrentUserInterface) => {
        this.currentUser = currentUser;
        this.initializeForm();
      })
  }

  initializeForm(): void {
    if (!this.currentUser) throw new Error('Current user is not set!');
    this.form.patchValue({
      image: this.currentUser.image ?? '',
      username: this.currentUser.username ?? '',
      bio: this.currentUser.bio ?? '',
      email: this.currentUser.email ?? '',
      // Empty by default
      password: '',
    })
  }

  submit() {
    if (!this.currentUser) throw new Error('Current user not available!');
    const currentUserRequest: CurrentUserRequestInterface = {
      // Merging current user values, with form values
      user: {
        ...this.currentUser,
        ...this.form.getRawValue()
      }
    }
    this.store.dispatch(authActions.updateCurrentUser({ currentUserRequest }))
  }

  logout() {
    this.store.dispatch(authActions.logout())
  }

  ngOnDestroy(): void {
    this.currentUserSub?.unsubscribe();
  }
}
