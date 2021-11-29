import {Injectable, OnInit} from "@angular/core";
import {Order} from "../shopping-cart/models/order.model";
import {HttpClient} from "@angular/common/http";
import {BottlesService} from "./bottles.service";
import {Bottle} from "../shared/models/bottle.model";
import {lastValueFrom, Observable} from "rxjs";


@Injectable({
  providedIn: 'root'
})

export class BottleStorageService implements OnInit{
  constructor(private http:HttpClient) {}

  ngOnInit() {
    this.fetchBorders();
  }

  storeBottles(bottles: Bottle[]) {
    this.http.put('https://webstranka-45787-default-rtdb.europe-west1.firebasedatabase.app/bottles.json', bottles).subscribe(
        res => console.log('HTTP response', res),
        err => console.log('HTTP Error', err),
        () => console.log('HTTP request completed.')
    )
  }

  fetchBorders(): Promise<Bottle[]> {
    return lastValueFrom(this.http.get<Bottle[]>('https://webstranka-45787-default-rtdb.europe-west1.firebasedatabase.app/bottles.json'));
  }
}
