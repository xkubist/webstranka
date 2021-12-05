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
    this.bottles = await this.bottleStorageService.fetchBottles();
  }

  storeBottles(): void {
    this.bottleStorageService.storeBottles(this.bottles);
  }

  updateBottle( bottle: Bottle): void {
    if(!bottle || !this.bottles.find(s => s.id===bottle.id)) {
      return;
    }

    let tmpBottle: Bottle =this.bottles.find(s => s.id===bottle.id) ?? new Bottle();
    let index = this.bottles.indexOf(tmpBottle);
    console.log(index);
    this._bottles[index] = bottle;
  }

  pushBottle(bottle: Bottle): void {
    if (!bottle){
      return;
    }

    this.getMaxIdFromBottles();
    bottle.id = this.getMaxIdFromBottles()+1;
    this._bottles.push(bottle);
  }

  private getMaxIdFromBottles():number {
    let i: number = 0
    let idArray = this.bottles.map(value => value.id);
    idArray.forEach(value => {
      if (i < value) {
        i = value;
      }
    })
    return i;
  }
}
