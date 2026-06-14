import { Routes } from '@angular/router';

import { Login } from './pages/login/login';
import { Dashboard } from './pages/dashboard/dashboard';
import { CalendarComponent } from './pages/calendar/calendar';
import { Customers } from './pages/customers/customers';
import { AppointmentsComponent } from './pages/appointments/appointments';
import { Services } from './pages/services/services';
import { Billing } from './pages/billing/billing';
import { Staff } from './pages/staff/staff';
import { Settings } from './pages/settings/settings';

import { authGuard } from './guards/auth-guard';

export const routes: Routes = [

  {
    path: '',
    component: Login
  },

  {
    path: 'dashboard',
    component: Dashboard,
    canActivate: [authGuard]
  },

  {
    path: 'calendar',
    component: CalendarComponent,
    canActivate: [authGuard]
  },

  {
    path: 'appointments',
    component: AppointmentsComponent,
    canActivate: [authGuard]
  },

  {
    path: 'customers',
    component: Customers,
    canActivate: [authGuard]
  },

  {
    path: 'staff',
    component: Staff,
    canActivate: [authGuard]
  },

  {
    path: 'services',
    component: Services,
    canActivate: [authGuard]
  },

  {
    path: 'billing',
    component: Billing,
    canActivate: [authGuard]
  },

  {
    path: 'settings',
    component: Settings,
    canActivate: [authGuard]
  },

  {
    path: '**',
    redirectTo: ''
  }

];