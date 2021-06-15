import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ApiService } from '../api.service';

interface UserI {
  id: number;
  hairSalonId: number;
  username: string;
  password: string;
  role: number;
  firstName: string;
  lastName: string;
  address: string;
  phone: string;
  updatedAt: string;
  createdAt: string;
}

@Component({
  selector: 'app-hairdressers',
  templateUrl: './hairdressers.component.html',
  styleUrls: ['./hairdressers.component.scss'],
})
export class HairdressersComponent implements OnInit {
  dataSource!: MatTableDataSource<UserI>;
  hairSalons: any;
  displayedColumns = [
    'id',
    'username',
    'firstName',
    'lastName',
    'phone',
    'createdAt',
    'edit',
    'remove',
  ];

  currentItem: any;

  constructor(
    private readonly apiService: ApiService,
    private readonly modalService: NgbModal
  ) {}

  async ngOnInit() {
    const hairdressers: UserI[] = await this.apiService.getHairDressers();
    this.hairSalons = await this.apiService.getHairSalons();
    this.dataSource = new MatTableDataSource(hairdressers);
  }

  async add(modal: any) {
    this.currentItem = {
      hairSalonId: '',
      username: '',
      password: '',
      role: '',
      firstName: '',
      lastName: '',
      address: '',
      phone: '',
    };

    const modalRef = this.modalService.open(modal);
    const reason = await modalRef.closed.toPromise();

    if (reason === 'save') {
      const newHairdresser = await this.apiService.createUser(this.currentItem);

      this.dataSource.data.push(newHairdresser);
      this.dataSource._updateChangeSubscription();
    }
  }

  async edit(modal: any, hairdresserId: number) {
    const item = this.dataSource.data.find(
      (currentHairdresser: any) => currentHairdresser.id === hairdresserId
    );

    this.currentItem = { ...item };

    const modalRef = this.modalService.open(modal);
    const reason = await modalRef.closed.toPromise();

    if (reason === 'save') {
      delete this.currentItem.id;
      delete this.currentItem.createdAt;
      delete this.currentItem.updatedAt;

      const updatedUser = await this.apiService.updateUser(
        hairdresserId,
        this.currentItem
      );

      const hairdresserIndex = this.dataSource.data.findIndex(
        (currentHairdresser: UserI) => currentHairdresser.id === hairdresserId
      );

      this.dataSource.data.splice(hairdresserIndex, 1, updatedUser);
      this.dataSource._updateChangeSubscription();
    }
  }

  async remove(hairdresserId: number) {
    await this.apiService.removeUser(hairdresserId);
    const hairdresserIndex = this.dataSource.data.findIndex(
      (currentHairdresser: UserI) => currentHairdresser.id === hairdresserId
    );

    this.dataSource.data.splice(hairdresserIndex, 1);
    this.dataSource._updateChangeSubscription();
  }
}
