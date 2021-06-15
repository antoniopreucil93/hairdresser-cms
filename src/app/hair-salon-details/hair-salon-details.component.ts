import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ApiService } from '../api.service';

export interface ServiceI {
  id: number;
  hairSalonId: number;
  name: string;
  price: number;
  createdAt: string;
  updatedAt: string;
}

@Component({
  selector: 'app-hair-salon-details',
  templateUrl: './hair-salon-details.component.html',
  styleUrls: ['./hair-salon-details.component.scss'],
})
export class HairSalonDetailsComponent implements OnInit {
  hairSalonId: any;
  hairSalon: any;

  isDataLoaded = false;

  formGroupObject: any;
  formGroupService: any;

  displayedColumns: string[] = [
    'id',
    'name',
    'price',
    'duration',
    'createdAt',
    'remove',
  ];

  dataSource!: MatTableDataSource<ServiceI>;

  currentItem: any;

  constructor(
    private readonly route: ActivatedRoute,
    private readonly apiService: ApiService,
    private readonly modalService: NgbModal
  ) {}

  async ngOnInit() {
    this.hairSalonId = localStorage.getItem('hairSalonId');

    this.currentItem = await this.apiService.getHairSalon(this.hairSalonId);

    this.initObjectForm();

    this.isDataLoaded = true;

    const hairSalonServices = await this.apiService.getHairSalonServices(
      this.hairSalonId
    );

    this.dataSource = new MatTableDataSource(hairSalonServices);
  }

  initObjectForm() {
    this.formGroupObject = new FormGroup({
      name: new FormControl(this.currentItem.name, [Validators.required]),
      description: new FormControl(this.currentItem.description, [
        Validators.required,
      ]),
      phone: new FormControl(this.currentItem.phone, [Validators.required]),
      address: new FormControl(this.currentItem.address, [Validators.required]),
      city: new FormControl(this.currentItem.city, [Validators.required]),
    });
  }

  initServiceForm() {
    this.formGroupService = new FormGroup({
      serviceName: new FormControl(null, [Validators.required]),
      price: new FormControl(null, [Validators.required]),
      durationInMinutes: new FormControl(null, [Validators.required]),
    });
  }

  async add(modal: any) {
    this.initServiceForm();
    this.currentItem = { name: '', price: 0 };
    const modalRef = this.modalService.open(modal);
    const reason = await modalRef.closed.toPromise();

    if (reason === 'save') {
      const servicePayload = {
        name: this.formGroupService.controls['serviceName'].value,
        price: this.formGroupService.controls['price'].value,
        durationInMinutes: this.formGroupService.controls['durationInMinutes']
          .value,
      };
      console.log(servicePayload);
      const newService = await this.apiService.createService({
        ...servicePayload,
        hairSalonId: this.hairSalonId,
      });
      this.dataSource.data.push(newService);
      this.dataSource._updateChangeSubscription();
    }
  }

  async editHairSalon() {
    const hairSalonPayload = {
      name: this.formGroupObject.controls['name'].value,
      description: this.formGroupObject.controls['description'].value,
      phone: this.formGroupObject.controls['phone'].value,
      address: this.formGroupObject.controls['address'].value,
      city: this.formGroupObject.controls['city'].value,
    };

    const updatedHairSalon = await this.apiService.updateHairSalon(
      this.hairSalonId,
      hairSalonPayload
    );
  }

  async remove(itemId: number) {
    await this.apiService.removeService(itemId);
    const hairSalonIndex = this.dataSource.data.findIndex(
      (currentService: ServiceI) => currentService.id === itemId
    );

    this.dataSource.data.splice(hairSalonIndex, 1);
    this.dataSource._updateChangeSubscription();
  }

  get name() {
    return this.formGroupObject.get('name');
  }

  get description() {
    return this.formGroupObject.get('description');
  }

  get phone() {
    return this.formGroupObject.get('phone');
  }

  get address() {
    return this.formGroupObject.get('address');
  }

  get city() {
    return this.formGroupObject.get('city');
  }

  get serviceName() {
    return this.formGroupService.get('serviceName');
  }

  get price() {
    return this.formGroupService.get('price');
  }

  get durationInMinutes() {
    return this.formGroupService.get('durationInMinutes');
  }
}
