import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  hairSalons: any;

  constructor(private readonly apiService: ApiService) {}

  async ngOnInit() {
    this.hairSalons = await this.apiService.getHairSalons();
  }
}
