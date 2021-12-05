import {Injectable, OnInit} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Bottle} from "../shared/models/bottle.model";
import {lastValueFrom} from "rxjs";


@Injectable({
  providedIn: 'root'
})

export class BottleStorageService implements OnInit{

  private readonly BOTTLES_WEB_ADDRESS: string = 'https://webstranka-45787-default-rtdb.europe-west1.firebasedatabase.app/bottles.json'
  constructor(private http:HttpClient) {}

  ngOnInit() {
  }

  storeBottles(bottles: Bottle[]): void {
    this.http.put(this.BOTTLES_WEB_ADDRESS, bottles).subscribe(
        res => console.log('HTTP response', res),
        err => console.log('HTTP Error', err),
        () => console.log('HTTP request completed.')
    )
  }

  fetchBottles(): Promise<Bottle[]> {
    return lastValueFrom(this.http.get<Bottle[]>(this.BOTTLES_WEB_ADDRESS));
  }
}
