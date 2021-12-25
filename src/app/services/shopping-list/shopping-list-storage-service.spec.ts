import {inject, TestBed} from "@angular/core/testing";
import {ShoppingListStorageService} from "./shopping-list-storage-service";
import {ShoppingItemModel} from "../../checkout/models/shopping-item.model";
import {HttpClientTestingModule, HttpTestingController} from "@angular/common/http/testing";

const SHOPPING_LIST_WEB_ADDRESS = 'https://webstranka-45787-default-rtdb.europe-west1.firebasedatabase.app/shoppingList.json';

const SAMPLE_SHOPPING_LIST: ShoppingItemModel[] = [
  {
    bottle: {
      id: 1,
      bottleName: 'Bottle Name',
      description: 'Description',
      price: 123456789,
      imagePath: 'path.jpg',
    },
    amount: 5
  },
  {
    bottle: {
      id: 2,
      bottleName: 'Another Bottle Name',
      description: 'Another Description',
      price: 213456789,
      imagePath: 'anotherPath.jpg'
    },
    amount: 8
  }
]

describe('ShoppingListStorageService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        ShoppingListStorageService,
      ]
    })
  })

  it('should be created', inject([ShoppingListStorageService],
    (service: ShoppingListStorageService) => {
      expect(service)
        .toBeTruthy();
    })
  )

  it('should call put method with SHOPPING_LIST_WEB_ADDRESS and SAMPLE_SHOPPING_LIST', inject([HttpTestingController, ShoppingListStorageService],
    (httpTestingController: HttpTestingController, service: ShoppingListStorageService) => {

      service.storeShoppingList(SAMPLE_SHOPPING_LIST);

      const req = httpTestingController.expectOne(SHOPPING_LIST_WEB_ADDRESS);
      expect(req.request.method).toEqual("PUT");
      expect(req.request.body).toEqual(SAMPLE_SHOPPING_LIST);
    })
  )

  it('should call HttpClient get method with SHOPPING_LIST_WEB_ADDRESS parameter and get correct data', inject([HttpTestingController, ShoppingListStorageService],
    (httpTestingController: HttpTestingController, service: ShoppingListStorageService) => {
      service.fetchShoppingList().then((shoppingList) => {
        expect(shoppingList).toEqual(SAMPLE_SHOPPING_LIST);
      })

      const req = httpTestingController.expectOne(SHOPPING_LIST_WEB_ADDRESS);
      expect(req.request.method).toEqual("GET");
      req.flush(SAMPLE_SHOPPING_LIST);
    })
  )
})
