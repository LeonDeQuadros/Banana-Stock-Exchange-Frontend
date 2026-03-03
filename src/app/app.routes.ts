import { Routes } from '@angular/router';
import { Login} from './components/login/login';
import { Register } from './components/register/register';
import { Dashboard } from './components/dashboard/dashboard';
import { authGuard } from './guards/auth-guard';
import { guestGuard } from './guards/guest-guard';

export const routes: Routes = [
    {path: '', redirectTo: 'login', pathMatch: 'full'},
    {path: 'register', component: Register},
    {path: 'login', canActivate: [guestGuard],component: Login},

    {path: 'dashboard', canActivate: [authGuard], component: Dashboard},

    {path: '**', redirectTo: 'login'}
];
