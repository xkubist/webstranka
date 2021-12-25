import {Bottle} from "../../shared/models/bottle.model";
import {Injectable} from "@angular/core";
import {BottleStorageService} from "./bottle-storage.service";
import {BehaviorSubject, Observable, ReplaySubject, Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class BottlesService {

  public bottles: Bottle[];
  public bottlesReady: ReplaySubject<null>;

  constructor(private bottleStorageService: BottleStorageService) {
    this.bottlesReady = new ReplaySubject();
  }

  async loadBottles(): Promise<void> {
    try {
      this.bottles = await this.bottleStorageService.fetchBottles();
      this.bottlesReady.next(null);
    } catch (err) {
      console.log(err)
    }
  }

  saveBottles(): void {
    this.bottleStorageService.storeBottles(this.bottles);
  }

  updateBottle(bottle: Bottle): void {
    if(!bottle || !this.bottles.find(s => s.id===bottle.id)) {
      return;
    }

    let tmpBottle: Bottle =this.bottles.find(s => s.id===bottle.id) ?? new Bottle();
    let index = this.bottles.indexOf(tmpBottle);
    this.bottles[index] = bottle;
  }

  pushBottle(bottle: Bottle): void {
    if (!bottle){
      return;
    }

    bottle.id = this.getMaxIdFromBottles()+1;
    this.bottles.push(bottle);
    this.saveBottles();
  }

  removeBottle(bottle: Bottle): void {
    if (!bottle){
      alert('Bottle parameter should not be empty');
      return;
    }
    if(this.getBottleIndex(bottle)===-1) {
      alert('Cannot find bottle to delete');
      return;
    }
    this.bottles.splice(this.getBottleIndex(bottle), 1);
    this.saveBottles();
  }

  private getMaxIdFromBottles():number {
    return Math.max(...this.bottles.map((value) => value.id));
  }

  private getBottleIndex(bottle: Bottle): number {
    return this.bottles.findIndex((b) => b.id === bottle.id);
  }
}
