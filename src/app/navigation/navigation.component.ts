import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss'],
})
export class NavigationComponent implements OnInit {
  role: number;

  constructor(private router: Router) {
    this.role = Number(localStorage.getItem('role'));
  }

  logout() {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('hairSalonId');
    localStorage.removeItem('role');
    this.router.navigateByUrl('auth');
  }

  ngOnInit(): void {}
}
