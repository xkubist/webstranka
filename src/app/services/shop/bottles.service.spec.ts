import {inject, TestBed, waitForAsync} from "@angular/core/testing";
import {BottlesService} from "./bottles.service";
import {BottleStorageService} from "./bottle-storage.service";
import {Bottle} from "../../shared/models/bottle.model";
import {HttpClientTestingModule,} from "@angular/common/http/testing";

const SAMPLE_BOTTLES: Bottle[] = [{
  id: 1,
  bottleName: 'Bottle Name',
  description: 'Description',
  price: 100,
  imagePath: 'path.jpg',
},
  {
    id: 2,
    bottleName: 'Another Bottle Name',
    description: 'Another Description',
    price: 100,
    imagePath: 'anotherPath.jpg',
  }]

const NEW_BOTTLES: Bottle[] = [{
  id: 1,
  bottleName: 'New Name',
  description: 'New Description',
  price: 200,
  imagePath: 'newPath.jpg',
},
  {
    id: 2,
    bottleName: 'Another Bottle Name',
    description: 'Another Description',
    price: 100,
    imagePath: 'anotherPath.jpg',
  }]

describe('BottleService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        BottlesService,
        {
          provide: BottleStorageService, useValue: jasmine.createSpyObj({
              'fetchBottles': Promise.resolve(SAMPLE_BOTTLES),
              'storeBottles': null,
            }
          )
        },
      ]
    })
  })

  it('should be created', () => {
    const service: BottlesService = TestBed.inject(BottlesService);
    expect(service)
      .toBeTruthy();
  })

  it('should fetch bottles', waitForAsync(
    inject([BottleStorageService, BottlesService],
      (storage: BottleStorageService, service: BottlesService) => {
        service.loadBottles().then(() =>
          expect(service.bottles).toEqual(SAMPLE_BOTTLES)
        );
      })
  ))


  it('should call BottleStoreService storeBottles method with correct data', inject([BottleStorageService, BottlesService],
    (storage: BottleStorageService, service: BottlesService) => {

      service.bottles = JSON.parse(JSON.stringify(SAMPLE_BOTTLES));
      service.saveBottles();

      expect(storage.storeBottles)
        .toHaveBeenCalledOnceWith(SAMPLE_BOTTLES);
    })
  )

  it('should update bottle with same id', inject([BottlesService],
    (service: BottlesService) => {

      service.bottles = JSON.parse(JSON.stringify(SAMPLE_BOTTLES));
      service.updateBottle(NEW_BOTTLES[0]);

      expect(service.bottles)
        .toEqual(NEW_BOTTLES);
    })
  )

  it('should create new bottle with correct id', inject([BottlesService],
    (service: BottlesService) => {
      service.bottles = JSON.parse(JSON.stringify(SAMPLE_BOTTLES));
      let newBottlesCopy: Bottle[] = JSON.parse(JSON.stringify(NEW_BOTTLES))

      let bottle: Bottle = newBottlesCopy[0];
      bottle.id = 3;
      let bottles: Bottle[] = [...service.bottles, bottle];


      service.pushBottle(newBottlesCopy[0]);

      expect(service.bottles)
        .toEqual(bottles);
    })
  )

  it('should remove bottle', inject([BottleStorageService, BottlesService],
    (storage: BottleStorageService, service: BottlesService) => {
      let bottles: Bottle[] = service.bottles = JSON.parse(JSON.stringify(SAMPLE_BOTTLES));
      let index = 1;
      let bottle = bottles[1]
      service.bottles = JSON.parse(JSON.stringify(bottles));

      service.removeBottle(bottle);
      bottles.splice(index, 1);

      expect(storage.storeBottles).toHaveBeenCalledWith(bottles);
      expect(service.bottles).toEqual(bottles);
    })
  )
})
