import { Component, OnInit, Pipe, PipeTransform } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { ThemePalette } from '@angular/material/core';
import { MatTableDataSource } from '@angular/material/table';
import * as moment from 'moment';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ApiService } from '../api.service';
import { ServiceI } from '../hair-salon-details/hair-salon-details.component';
import { OrderStatusE, UserOrderI } from '../user-orders/user-orders.component';
import { timer } from 'rxjs';

@Component({
  selector: 'app-hairsalon-profile',
  templateUrl: './hairsalon-profile.component.html',
  styleUrls: ['./hairsalon-profile.component.scss'],
})
export class HairsalonProfileComponent implements OnInit {
  formControlName = 'serviceName';

  hairSalonId: any;
  hairSalon: any;
  hairSalonServices: any;

  displayedColumns: string[] = ['id', 'name', 'price', 'apply'];
  dataSource!: MatTableDataSource<ServiceI>;

  displayedColumnsTodayOrders: string[] = [
    'id',
    'hairSalonName',
    'serviceName',
    'username',
    'status',
  ];
  dataSourceTodayOrders!: MatTableDataSource<UserOrderI>;

  isLoaded = false;
  isLoadedTerm = true;

  form: any;

  counter: any;
  currentTimestamp: any;
  endTimestamp: any;

  showCounter = false;

  constructor(
    private readonly apiService: ApiService,
    private readonly route: ActivatedRoute,
    private readonly modalService: NgbModal,
    private _formBuilder: FormBuilder,
    private router: Router
  ) {}

  async ngOnInit() {
    this.route.paramMap.subscribe(async (paramMap) => {
      this.hairSalonId = paramMap.get('hairSalonId');
      this.hairSalon = await this.apiService.getHairSalon(this.hairSalonId);
      this.dataSource = await this.apiService.getHairSalonServices(
        this.hairSalonId
      );
      this.isLoaded = true;

      const userOrders = await this.apiService.getTodayOrders(this.hairSalonId);

      const dataSourceTodayOrders = userOrders.map((currentOrder: any) => ({
        id: currentOrder.id,
        hairSalonName: currentOrder.hairSalon.name,
        serviceName: currentOrder.service.name,
        username: currentOrder.user.username,
        status: this.orderStatus(+currentOrder.status),
      }));

      this.dataSourceTodayOrders = new MatTableDataSource(
        dataSourceTodayOrders
      );

      const userId = Number(localStorage.getItem('userId'));

      const userClosestOrder = await this.apiService.getUserTodayOrder(
        userId,
        this.hairSalonId
      );
      console.log(userClosestOrder === null);

      if (userClosestOrder !== null) {
        this.showCounter = true;

        this.endTimestamp = moment(userClosestOrder.datetime).unix();
        this.currentTimestamp = moment().unix();

        this.counter = this.endTimestamp - this.currentTimestamp;

        timer(0, 1000).subscribe(() => --this.counter);
      }

      this.isLoadedTerm = true;
    });
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

  initForm() {
    this.form = this._formBuilder.group({
      datetime: ['', Validators.required],
    });
  }

  async apply(modal: any, serviceId: number) {
    this.initForm();
    const modalRef = this.modalService.open(modal);
    const reason = await modalRef.closed.toPromise();

    if (reason === 'save') {
      const userId = localStorage.getItem('userId');
      const createServicePayload = {
        userId: Number(localStorage.getItem('userId')),
        datetime: this.form.get('datetime').value,
        hairSalonId: Number(this.hairSalonId),
        serviceId,
      };
      const newService = await this.apiService.createOrder(
        createServicePayload
      );

      this.router.navigateByUrl('dashboard');
    }
  }

  get datetime() {
    return this.form.get('datetime');
  }
}

@Pipe({
  name: 'formatTime',
})
export class FormatTimePipe implements PipeTransform {
  transform(value: number): string {
    const hours: number = Math.floor(value / 3600);
    const minutes: number = Math.floor((value % 3600) / 60);
    return (
      ('00' + hours).slice(-2) +
      ':' +
      ('00' + minutes).slice(-2) +
      ':' +
      ('00' + Math.floor(value - minutes * 60)).slice(-2)
    );
  }
}
