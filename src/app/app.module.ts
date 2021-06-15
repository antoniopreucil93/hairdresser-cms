import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTableModule } from '@angular/material/table';
import { MatGridListModule } from '@angular/material/grid-list';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthComponent } from './auth/auth.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HttpClientModule } from '@angular/common/http';
import { HairSalonsComponent } from './hair-salons/hair-salons.component';
import { JwtModule } from '@auth0/angular-jwt';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { environment } from '../environments/environment';
import { HairdressersComponent } from './hairdressers/hairdressers.component';
import { NavigationComponent } from './navigation/navigation.component';
import { HairSalonDetailsComponent } from './hair-salon-details/hair-salon-details.component';
import { OrdersComponent } from './orders/orders.component';
import {
  FormatTimePipe,
  HairsalonProfileComponent,
} from './hairsalon-profile/hairsalon-profile.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule, MAT_DATE_LOCALE } from '@angular/material/core';
import {
  MatDatetimepickerModule,
  MatNativeDatetimeModule,
} from '@mat-datetimepicker/core';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { UserOrdersComponent } from './user-orders/user-orders.component';
export function tokenGetter() {
  return localStorage.getItem('accessToken');
}

@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    DashboardComponent,
    HairSalonsComponent,
    HairdressersComponent,
    NavigationComponent,
    HairSalonDetailsComponent,
    OrdersComponent,
    HairsalonProfileComponent,
    UserOrdersComponent,
    FormatTimePipe,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatTabsModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    MatTableModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        allowedDomains: [`${environment.domain}`],
        disallowedRoutes: [`${environment.baseUrl}auth/admin/login`],
      },
    }),
    NgbModule,
    MatGridListModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatMomentDateModule,
    MatDatetimepickerModule,
    MatNativeDatetimeModule,
    MatFormFieldModule,
    MatInputModule,
  ],
  providers: [
    { provide: LOCALE_ID, useValue: 'fr-FR' },
    { provide: MAT_DATE_LOCALE, useValue: 'fr-FR' },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
