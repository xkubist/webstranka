import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Bottle} from "../../shared/models/bottle.model";
import {lastValueFrom} from "rxjs";
import {bottleStorageEnvironment} from "../../../environments/environment";


@Injectable({
  providedIn: 'root'
})

export class BottleStorageService{
  constructor(private http:HttpClient) {}

  storeBottles(bottles: Bottle[]): void {
    lastValueFrom(this.http.put(bottleStorageEnvironment.apiUrl, bottles));
  }

  fetchBottles(): Promise<Bottle[]> {
    return lastValueFrom(this.http.get<Bottle[]>(bottleStorageEnvironment.apiUrl));
  }
}
