import {Bottle} from "../shared/models/bottle.model";
import {Injectable} from "@angular/core";
import {BottleStorageService} from "./bottle-storage.service";

@Injectable({
  providedIn: 'root'
})
export class BottlesService {
  private _bottles: Bottle[];

  constructor(private bottleStorageService: BottleStorageService) {
  }

  get bottles(): Bottle[] {
    return this._bottles.slice();
  }

  set bottles(bottles: Bottle[]) {
   this._bottles=bottles;
  }

  async loadBottles(): Promise<void> {
    this.bottles = await this.bottleStorageService.fetchBorders();
  }

  storeBottles(): void {
    this.bottleStorageService.storeBottles(this.bottles);
  }
}
