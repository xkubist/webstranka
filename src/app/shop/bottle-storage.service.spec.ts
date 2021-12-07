import {inject, TestBed} from "@angular/core/testing";
import {BottleStorageService} from "./bottle-storage.service";
import {Bottle} from "../shared/models/bottle.model";
import {HttpClientTestingModule, HttpTestingController} from "@angular/common/http/testing";

const SAMPLE_BOTTLES: Bottle[] = [
  {
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
  }
]

const BOTTLES_WEB_ADDRESS: string = 'https://webstranka-45787-default-rtdb.europe-west1.firebasedatabase.app/bottles.json'

describe('BottleStorageService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        BottleStorageService,
      ]
    })
  })

  it('should be created', inject([BottleStorageService],
    (service: BottleStorageService) => {

      expect(service)
        .toBeTruthy();
    })
  )

  it('should call HttpClient put method with BOTTLE_WEB_ADDRESS and SAMPLE_BOTTLES as parameters', inject([HttpTestingController, BottleStorageService],
    (httpTestingController: HttpTestingController, service: BottleStorageService) => {

      service.storeBottles(SAMPLE_BOTTLES);

      const req = httpTestingController.expectOne(BOTTLES_WEB_ADDRESS);
      expect(req.request.method).toEqual("PUT");
      expect(req.request.body).toEqual(SAMPLE_BOTTLES);
    })
  )

  it('should call HttpClient get method with BOTTLES_WEB_ADDRESS parameter and get correct data', inject([HttpTestingController, BottleStorageService],
    (httpTestingController: HttpTestingController, service: BottleStorageService) => {
      service.fetchBottles().then((bottles) => {
        expect(bottles).toEqual(SAMPLE_BOTTLES);
      })

      const req = httpTestingController.expectOne(BOTTLES_WEB_ADDRESS);
      expect(req.request.method).toEqual("GET");
      req.flush(SAMPLE_BOTTLES);
    })
  )
})
