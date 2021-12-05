import {inject, TestBed} from "@angular/core/testing";
import {HttpClient} from "@angular/common/http";
import {ShoppingListStorageService} from "./shopping-list-storage-service";
import {CartItem} from "../ckeckout/models/cart-item.model";
import {HttpClientTestingModule, HttpTestingController} from "@angular/common/http/testing";

const SHOPPING_LIST_WEB_ADDRESS = 'https://webstranka-45787-default-rtdb.europe-west1.firebasedatabase.app/shoppingList.json';

const SHOPPING_LIST: CartItem[] = [
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

describe('shopping list service storage tests', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        ShoppingListStorageService,
      ]
    })
  })

  it('should be created', inject([HttpTestingController, ShoppingListStorageService],
    (httpMock: HttpTestingController, service: ShoppingListStorageService) => {
      expect(service)
        .toBeTruthy();
    })
  )

  it('should call put method with SHOPPING_LIST_WEB_ADDRESS AND SHOPPING_LIST', inject([HttpTestingController, ShoppingListStorageService],
    (httpTestingController: HttpTestingController, service: ShoppingListStorageService) => {

        service.storeShoppingList(SHOPPING_LIST);

        const req = httpTestingController.expectOne(SHOPPING_LIST_WEB_ADDRESS);
        expect(req.request.method).toEqual("PUT");
        expect(req.request.body).toEqual(SHOPPING_LIST);
      })
    )


      // it('should call HttpClient get method with BOTTLES_WEB_ADDRESS parameter', () => {
      //   const service: ShoppingListStorageService = TestBed.inject(ShoppingListStorageService);
      //   const client: HttpClient = TestBed.inject(HttpClient);
      //
      //   service.fetchShoppingList();
      //
      //   expect(client.get)
      //     .toHaveBeenCalledOnceWith(SHOPPING_LIST_WEB_ADDRESS);
      // })
    })
