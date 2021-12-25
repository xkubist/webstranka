import {inject, TestBed, waitForAsync} from "@angular/core/testing";
import {ShoppingListStorageService} from "./shopping-list-storage-service";
import {ShoppingListService} from "./shopping-list.service";
import {ShoppingItemModel} from "../../checkout/models/shopping-item.model";
import {Bottle} from "../../shared/models/bottle.model";
import {HttpClientTestingModule} from "@angular/common/http/testing";

const SAMPLE_SHOPPING_LIST: ShoppingItemModel[] = [
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

describe('ShoppingListService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule(
      {
        imports: [HttpClientTestingModule],
        providers: [
          ShoppingListService,
          {
            provide: ShoppingListStorageService, useValue: jasmine.createSpyObj({
                'storeShoppingList': null,
                'fetchShoppingList': Promise.resolve(SAMPLE_SHOPPING_LIST)
              }
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

  it('should fetch shopping list', waitForAsync(
      inject([ShoppingListStorageService, ShoppingListService],
        (storage: ShoppingListStorageService, service: ShoppingListService) => {
          service.loadShoppingList().then(() =>
            expect(service.shoppingList).toEqual(SAMPLE_SHOPPING_LIST)
          )
        })
    )
  )

  it('should add 5 of existing bottles to shopping list', inject([ShoppingListService],
    (service: ShoppingListService) => {
      service.shoppingList = JSON.parse(JSON.stringify(SAMPLE_SHOPPING_LIST));
      let shoppingItem: ShoppingItemModel = new ShoppingItemModel();
      shoppingItem.amount=5;
      shoppingItem.bottle=FIRST_BOTTLE_FROM_SHOPPING_LIST;
      service.storeItemToList(shoppingItem);

      expect(service.shoppingList.length).toEqual(2);
      expect(service.shoppingList[0].bottle).toEqual(FIRST_BOTTLE_FROM_SHOPPING_LIST);
      expect(service.shoppingList[0].amount).toEqual(6);
    })
  )


  it('should add 5 of new bottle to shopping list', inject([ShoppingListService],
    (service: ShoppingListService) => {
      service.shoppingList = JSON.parse(JSON.stringify(SAMPLE_SHOPPING_LIST));
      let shoppingItem: ShoppingItemModel = new ShoppingItemModel();
      shoppingItem.amount=5;
      shoppingItem.bottle=NEW_BOTTLE;
      service.storeItemToList(shoppingItem);

      expect(service.shoppingList.length).toEqual(3);
      expect(service.shoppingList[2].bottle).toEqual(NEW_BOTTLE);
      expect(service.shoppingList[2].amount).toEqual(5);
    })
  )

  it('should get total cost of shopping list', inject([ShoppingListService],
    (service: ShoppingListService) => {
      service.shoppingList = JSON.parse(JSON.stringify(SAMPLE_SHOPPING_LIST));

      expect(service.getTotalSum())
        .toEqual(200);
    })
  )

  it('should remove shopping item from list', inject([ShoppingListStorageService, ShoppingListService],
    (storage: ShoppingListStorageService, service: ShoppingListService) => {
      let shoppingList: ShoppingItemModel[] = JSON.parse(JSON.stringify(SAMPLE_SHOPPING_LIST));
      let index: number = 0
      service.shoppingList = shoppingList.slice();

      service.removeItemFromList(0);
      shoppingList.splice(0, 1)

      expect(service.shoppingList).toEqual(shoppingList);
      expect(storage.storeShoppingList).toHaveBeenCalledOnceWith(shoppingList)
    })
  )

  it('should update amount of bottle', inject([ShoppingListService],
    (service: ShoppingListService) => {
        let index: number = 1;
        let amount: number = 1;
        service.shoppingList = JSON.parse(JSON.stringify(SAMPLE_SHOPPING_LIST));

        service.updateAmount(index,amount);

        expect(service.shoppingList[index].amount).toEqual(amount);
      })
  )

  it('should update bottle in shoppingListItem', inject([ShoppingListService],
    (service: ShoppingListService) => {
      let index: number = 1;
      let bottle: Bottle =  {
        id: 2,
        bottleName: 'New Bottle Name',
        description: 'New Description',
        price: 100,
        imagePath: 'New path.jpg',
      };
      service.shoppingList = JSON.parse(JSON.stringify(SAMPLE_SHOPPING_LIST));

      service.updateBottle(bottle);

      expect(service.shoppingList[index].bottle).toEqual(bottle);
    })
  )
})
