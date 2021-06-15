import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ApiService } from '../api.service';
import { OrderStatusE } from '../user-orders/user-orders.component';

interface OrderI {
  id: number;
  hairSalonName: string;
  serviceName: string;
  username: string;
  status: string;
  datetime: string;
}

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss'],
})
export class OrdersComponent implements OnInit {
  hairSalonId: any;
  orders: any;

  displayedColumns: string[] = [
    'id',
    'hairSalonName',
    'serviceName',
    'username',
    'datetime',
    'status',
    'cancel',
    'confirm',
    'finish',
  ];
  isLoaded = false;
  dataSource!: MatTableDataSource<OrderI>;

  constructor(
    private readonly apiService: ApiService,
    private readonly modalService: NgbModal
  ) {}

  async ngOnInit() {
    this.hairSalonId = localStorage.getItem('hairSalonId');

    const hairSalonOrders = await this.apiService.getHairSalonOrders(
      this.hairSalonId
    );

    const mappedOrders = hairSalonOrders.map((currentOrder) => ({
      id: currentOrder.id,
      hairSalonName: currentOrder.hairSalon.name,
      serviceName: currentOrder.service.name,
      username: currentOrder.user.username,
      datetime: currentOrder.datetime,
      status: this.orderStatus(+currentOrder.status),
    }));

    this.dataSource = new MatTableDataSource(mappedOrders);

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

  async cancel(orderId: number) {
    const updatedOrder = await this.apiService.updateOrder(orderId, {
      status: OrderStatusE.CANCELED,
    });

    const orderIndex = this.dataSource.data.findIndex(
      (currentOrder: any) => currentOrder.id === orderId
    );

    const order: OrderI = this.dataSource.data.find(
      (currentOrder) => currentOrder.id === orderId
    ) as OrderI;

    const orderForUpdate: OrderI = {
      ...order,
      status: this.orderStatus(+updatedOrder.status),
    };

    this.dataSource.data.splice(orderIndex, 1, orderForUpdate);
    this.dataSource._updateChangeSubscription();
  }

  async finish(orderId: number) {
    const updatedOrder = await this.apiService.updateOrder(orderId, {
      status: OrderStatusE.FINISHED,
    });

    const orderIndex = this.dataSource.data.findIndex(
      (currentOrder: any) => currentOrder.id === orderId
    );

    const order: OrderI = this.dataSource.data.find(
      (currentOrder) => currentOrder.id === orderId
    ) as OrderI;

    const orderForUpdate: OrderI = {
      ...order,
      status: this.orderStatus(+updatedOrder.status),
    };

    this.dataSource.data.splice(orderIndex, 1, orderForUpdate);
    this.dataSource._updateChangeSubscription();
  }

  async confirm(orderId: number) {
    const updatedOrder = await this.apiService.updateOrder(orderId, {
      status: OrderStatusE.CONFIRMED,
    });

    const orderIndex = this.dataSource.data.findIndex(
      (currentOrder: any) => currentOrder.id === orderId
    );

    const order: OrderI = this.dataSource.data.find(
      (currentOrder) => currentOrder.id === orderId
    ) as OrderI;

    const orderForUpdate: OrderI = {
      ...order,
      status: this.orderStatus(+updatedOrder.status),
    };

    this.dataSource.data.splice(orderIndex, 1, orderForUpdate);
    this.dataSource._updateChangeSubscription();
  }

  async edit(orderId: number) {}
}
