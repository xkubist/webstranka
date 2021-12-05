import {TestBed} from "@angular/core/testing";
import {ShoppingListStorageService} from "./shopping-list-storage-service";
import {ShoppingListService} from "./shopping-list.service";
import {CartItem} from "../ckeckout/models/cart-item.model";
import {Bottle} from "../shared/models/bottle.model";
import {HttpClientTestingModule} from "@angular/common/http/testing";
const SHOPPING_LIST: CartItem[] = [
  {
    bottle: {
      id: 1,
      bottleName: 'Bottle Name',
      description: 'Description',
      price: 100,
      imagePath: 'path.jpg',
    },
    amount: 1
  },
  {
    bottle: {
      id: 2,
      bottleName: 'Another Bottle Name',
      description: 'Another Description',
      price: 100,
      imagePath: 'anotherPath.jpg'
    },
    amount: 1
  }
]

const FIRST_BOTTLE_FROM_SHOPPING_LIST: Bottle = {
  id: 1,
  bottleName: 'Bottle Name',
  description: 'Description',
  price: 100,
  imagePath: 'path.jpg',
}

const NEW_BOTTLE: Bottle = {
  id: 3,
  bottleName: 'New Bottle Name',
  description: 'New Description',
  price: 200,
  imagePath: 'newPath.jpg',
}

describe('ShoppingListServiceTests' , () => {
  beforeEach(() => {
    TestBed.configureTestingModule(
      {
        imports: [HttpClientTestingModule],
        providers: [
          ShoppingListService,
          {
            provide: ShoppingListStorageService, useValue: jasmine.createSpyObj(
              ['storeShoppingList','fetchShoppingList']
            )
          }
        ]
      }
    )
  })

  it('should be created', () => {
    const service: ShoppingListService = TestBed.inject(ShoppingListService);
    expect(service)
      .toBeTruthy();
  })

  it('should add 5 of existing bottles to shopping list', () => {
    const service: ShoppingListService = TestBed.inject(ShoppingListService);
    service.shoppingCart = JSON.parse(JSON.stringify(SHOPPING_LIST));

    service.storeItemToList(FIRST_BOTTLE_FROM_SHOPPING_LIST,5);

    expect(service.shoppingCart.length).toEqual(2);
    expect(service.shoppingCart[0].bottle).toEqual(FIRST_BOTTLE_FROM_SHOPPING_LIST);
    expect(service.shoppingCart[0].amount).toEqual(6);
  })


  it('should add 5 of new bottle in shopping list', () =>{
    const service: ShoppingListService = TestBed.inject(ShoppingListService);
    service.shoppingCart = JSON.parse(JSON.stringify(SHOPPING_LIST));

    service.storeItemToList(NEW_BOTTLE,5);

    expect(service.shoppingCart.length).toEqual(3);
    expect(service.shoppingCart[2].bottle).toEqual(NEW_BOTTLE);
    expect(service.shoppingCart[2].amount).toEqual(5);
  })

  it('should get total cost of shopping list' ,() => {
    const service: ShoppingListService = TestBed.inject(ShoppingListService);
    service.shoppingCart = JSON.parse(JSON.stringify(SHOPPING_LIST));

    expect (service.getTotalSum())
      .toEqual(200);
  })
})
