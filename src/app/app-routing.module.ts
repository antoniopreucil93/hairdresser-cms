import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth.guard';
import { AuthService } from './auth.service';
import { AuthComponent } from './auth/auth.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HairSalonDetailsComponent } from './hair-salon-details/hair-salon-details.component';
import { HairSalonsComponent } from './hair-salons/hair-salons.component';
import { HairdressersComponent } from './hairdressers/hairdressers.component';
import { HairsalonProfileComponent } from './hairsalon-profile/hairsalon-profile.component';
import { OrdersComponent } from './orders/orders.component';
import { RoleGuard } from './role.guard';
import { UserOrdersComponent } from './user-orders/user-orders.component';

export enum EUserRoles {
  SUPERADMIN = 1,
  HAIRDRESSER_ADMIN = 2,
  USER = 3,
}

const routes: Routes = [
  { path: 'auth', component: AuthComponent },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'hair-salons',
    component: HairSalonsComponent,
    canActivate: [AuthGuard, RoleGuard],
    data: {
      expectedRole: EUserRoles.SUPERADMIN,
    },
  },
  {
    path: 'hairdressers',
    component: HairdressersComponent,
    canActivate: [AuthGuard, RoleGuard],
    data: {
      expectedRole: EUserRoles.SUPERADMIN,
    },
  },
  {
    path: 'hair-salon-details',
    component: HairSalonDetailsComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'orders',
    component: OrdersComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'hair-salon-profile/:hairSalonId',
    component: HairsalonProfileComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'my-orders',
    component: UserOrdersComponent,
    canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
