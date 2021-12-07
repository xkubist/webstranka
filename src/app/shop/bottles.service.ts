import {Bottle} from "../shared/models/bottle.model";
import {Injectable} from "@angular/core";
import {BottleStorageService} from "./bottle-storage.service";
import {BehaviorSubject, Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class BottlesService {

  private _bottles: Bottle[];
  public bottlesReady: BehaviorSubject<null>;
  public bottlesReady$: Observable<null>;

  constructor(private bottleStorageService: BottleStorageService) {
    this.bottlesReady = new BehaviorSubject(null);
    this.bottlesReady$ = this.bottlesReady.asObservable();
  }

  get bottles(): Bottle[] {
    return JSON.parse(JSON.stringify(this._bottles)) as Bottle[];
  }

  set bottles(bottles: Bottle[]) {
   this._bottles=bottles;
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
    this.bottleStorageService.storeBottles(this._bottles);
  }

  updateBottle( bottle: Bottle): void {
    if(!bottle || !this._bottles.find(s => s.id===bottle.id)) {
      return;
    }

    let tmpBottle: Bottle =this._bottles.find(s => s.id===bottle.id) ?? new Bottle();
    let index = this._bottles.indexOf(tmpBottle);
    this._bottles[index] = bottle;
  }

  pushBottle(bottle: Bottle): void {
    if (!bottle){
      return;
    }

    this.getMaxIdFromBottles();
    bottle.id = this.getMaxIdFromBottles()+1;
    this._bottles.push(bottle);
    this.saveBottles();
  }

  removeBottle(index: number): void {
    if (!index){
      return;
    }

    this._bottles.splice(index, 1);
    console.log(this._bottles);
    this.saveBottles();
    console.log('saveBottle was called');
  }

  private getMaxIdFromBottles():number {
    let i: number = 0
    let idArray = this._bottles.map(value => value.id);
    idArray.forEach(value => {
      if (i < value) {
        i = value;
      }
    })
    return i;
  }
}
