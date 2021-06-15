import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';

export enum OrderStatusE {
  ORDERED = 1,
  CONFIRMED = 2,
  FINISHED = 3,
  CANCELED = 4,
}

export interface UserOrderI {
  id: number;
  hairSalonName: string;
  serviceName: string;
  username: string;
  status: number;
}

@Component({
  selector: 'app-user-orders',
  templateUrl: './user-orders.component.html',
  styleUrls: ['./user-orders.component.scss'],
})
export class UserOrdersComponent implements OnInit {
  displayedColumns: string[] = [
    'id',
    'hairSalonName',
    'serviceName',
    'username',
    'status',
  ];
  isLoaded = false;
  dataSource: any;

  userId: any;

  constructor(private readonly apiService: ApiService) {
    this.userId = localStorage.getItem('userId');
  }

  async ngOnInit() {
    const userOrders = await this.apiService.getUserOrders(this.userId);

    this.dataSource = userOrders.map((currentOrder) => ({
      id: currentOrder.id,
      hairSalonName: currentOrder.hairSalon.name,
      serviceName: currentOrder.service.name,
      username: currentOrder.user.username,
      status: this.orderStatus(+currentOrder.status),
    }));
    this.isLoaded = true;
  }

  orderStatus(statusValue: number) {
    let value = '';

    switch (statusValue) {
      case OrderStatusE.ORDERED:
        value = 'Naručen';
        break;
      case OrderStatusE.CONFIRMED:
        value = 'Potvrđeno';
        break;
      case OrderStatusE.FINISHED:
        value = 'Završeno';
        break;
      case OrderStatusE.CANCELED:
        value = 'Odbijeno';
        break;
    }

    return value;
  }
}
