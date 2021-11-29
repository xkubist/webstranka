import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-total',
  templateUrl: './total.component.html',
  styleUrls: ['./total.component.css']
})
export class TotalComponent {
  total: number;

  constructor() {
    this.total = 5000;
  }

  ngOnInit(): void {
  }

}
