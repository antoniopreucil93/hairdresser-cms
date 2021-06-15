import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';

const url = environment.baseUrl;

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private readonly http: HttpClient) {}

  getTodayOrders(hairSalonId: number) {
    return this.http.get<any>(`${url}/orders/today/${hairSalonId}`).toPromise();
  }

  getUserTodayOrder(userId: number, hairSalonId: number) {
    return this.http
      .get<any>(`${url}/orders/user/today/${userId}?hairSalonId=${hairSalonId}`)
      .toPromise();
  }

  updateOrder(orderId: number, orderPayload: any) {
    return this.http
      .patch<any>(`${url}/orders/${orderId}`, orderPayload)
      .toPromise();
  }

  getHairSalonOrders(hairSalonId: number) {
    return this.http
      .get<any[]>(`${url}/orders/hair-salon/${hairSalonId}`)
      .toPromise();
  }

  public createOrder(orderPayload: any) {
    return this.http.post<any>(`${url}/orders`, orderPayload).toPromise();
  }

  public getUserOrders(userId: number) {
    return this.http.get<any[]>(`${url}/orders/user/${userId}`).toPromise();
  }

  public login(loginPayload: { username: string; password: string }) {
    return this.http.post(`${url}/auth/login`, loginPayload).toPromise();
  }

  public register(registrationPayload: any) {
    return this.http
      .post(`${url}/auth/register`, registrationPayload)
      .toPromise();
  }

  public getHairSalons() {
    return this.http.get<any[]>(`${url}/hair-salons`).toPromise();
  }

  public updateHairSalon(hairSalonId: number, hairSalonPayload: any) {
    return this.http
      .patch<any>(`${url}/hair-salons/${hairSalonId}`, hairSalonPayload)
      .toPromise();
  }

  public createHairSalon(hairSalonPayload: any) {
    return this.http
      .post<any>(`${url}/hair-salons`, hairSalonPayload)
      .toPromise();
  }

  public removeHairSalon(hairSalonId: number) {
    return this.http
      .delete<any>(`${url}/hair-salons/${hairSalonId}`)
      .toPromise();
  }

  public getHairDressers() {
    return this.http.get<any[]>(`${url}/users/hairdressers`).toPromise();
  }

  public updateUser(userId: number, userPayload: any) {
    return this.http
      .patch<any>(`${url}/users/${userId}`, userPayload)
      .toPromise();
  }

  public createUser(userPayload: any) {
    return this.http.post<any>(`${url}/users`, userPayload).toPromise();
  }

  public removeUser(userId: number) {
    return this.http.delete<any>(`${url}/users/${userId}`).toPromise();
  }

  public getHairSalon(hairSalonId: number) {
    return this.http.get(`${url}/hair-salons/${hairSalonId}`).toPromise();
  }

  public getHairSalonServices(hairSalonId: number) {
    return this.http.get<any>(`${url}/services/${hairSalonId}`).toPromise();
  }

  public createService(servicePayload: any) {
    return this.http.post<any>(`${url}/services`, servicePayload).toPromise();
  }

  public removeService(serviceId: number) {
    return this.http.delete<any>(`${url}/services/${serviceId}`).toPromise();
  }
}
