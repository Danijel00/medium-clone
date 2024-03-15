import { Store } from '@ngrx/store';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { selectIsSubmitting, selectValidationErrors } from '../../store/reducers';
import { combineLatest } from 'rxjs';
import { LoginRequestInterface } from '../../types/loginRequest.interface';
import { authActions } from '../../store/actions';
import { BackendErrorMessageComponent } from '../../../shared/components/backend-error-message/backend-error-message.component';

@Component({
  selector: 'mc-login',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterLink,
    FormsModule,
    BackendErrorMessageComponent
  ],
  templateUrl: './login.component.html',
  styleUrl: '../../auth.component.scss',
})
export class LoginComponent implements OnInit {
  form!: FormGroup;

  data$ = combineLatest({
    isSubmitting: this.store.select(selectIsSubmitting),
    backendErrors: this.store.select(selectValidationErrors)
  })

  constructor(private fb: FormBuilder, private store: Store) { }

  initializeForm() {
    this.form = this.fb.nonNullable.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    })
  }

  ngOnInit(): void {
    this.initializeForm();
  }

  onSubmit() {
    const request: LoginRequestInterface = {
      user: this.form.getRawValue()
    }
    this.store.dispatch(authActions.login({ request }))
  }
}
