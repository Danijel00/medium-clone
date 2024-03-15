import { Routes } from "@angular/router";
import { RegisterComponent } from "./components/register/register.component";
import { LoginComponent } from "./components/login/login.component";
import { AuthGuard } from "./services/auth.guard";

export const registerRoutes: Routes = [
  {
    path: '',
    component: RegisterComponent,
    // canActivate: [AuthGuard]
  },
];
export const loginRoutes: Routes = [
  {
    path: '',
    component: LoginComponent,
  },
];
