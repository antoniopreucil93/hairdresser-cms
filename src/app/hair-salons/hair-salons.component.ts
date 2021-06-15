import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';

import { ApiService } from '../api.service';

export interface HairSalonI {
  id: number;
  name: string;
  description: string;
  phone: string;
  address: string;
  city: string;
  updatedAt: string;
  createdAt: string;
}

@Component({
  selector: 'app-hair-salons',
  templateUrl: './hair-salons.component.html',
  styleUrls: ['./hair-salons.component.scss'],
})
export class HairSalonsComponent implements OnInit {
  dataSource!: MatTableDataSource<HairSalonI>;
  displayedColumns = [
    'id',
    'name',
    'description',
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
    const hairSalons: HairSalonI[] = await this.apiService.getHairSalons();
    this.dataSource = new MatTableDataSource(hairSalons);
  }

  async edit(modal: any, hairSalonId: number) {
    const item = this.dataSource.data.find(
      (currentHairSalon: any) => currentHairSalon.id === hairSalonId
    );

    this.currentItem = { ...item };

    const modalRef = this.modalService.open(modal);
    const reason = await modalRef.closed.toPromise();

    if (reason === 'save') {
      delete this.currentItem.id;
      delete this.currentItem.createdAt;
      delete this.currentItem.updatedAt;

      const updatedHairSalon = await this.apiService.updateHairSalon(
        hairSalonId,
        this.currentItem
      );

      const hairSalonIndex = this.dataSource.data.findIndex(
        (currentHairSalon: HairSalonI) => currentHairSalon.id === hairSalonId
      );

      this.dataSource.data.splice(hairSalonIndex, 1, updatedHairSalon);
      this.dataSource._updateChangeSubscription();
    }
  }

  async add(modal: any) {
    this.currentItem = { name: '', description: '', address: '', phone: '' };

    const modalRef = this.modalService.open(modal);
    const reason = await modalRef.closed.toPromise();

    if (reason === 'save') {
      const newHairSalon = await this.apiService.createHairSalon(
        this.currentItem
      );
      this.dataSource.data.push(newHairSalon);
      this.dataSource._updateChangeSubscription();
    }
  }

  async remove(hairSalonId: number) {
    await this.apiService.removeHairSalon(hairSalonId);
    const hairSalonIndex = this.dataSource.data.findIndex(
      (currentHairSalon: HairSalonI) => currentHairSalon.id === hairSalonId
    );

    this.dataSource.data.splice(hairSalonIndex, 1);
    this.dataSource._updateChangeSubscription();
  }
}
