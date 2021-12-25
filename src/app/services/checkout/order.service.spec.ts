import {inject, TestBed} from "@angular/core/testing";
import {OrderStorageService} from "./order.storage.service";
import {OrderService} from "./order.service";
import {Delivery, Order, Payment} from "../../checkout/models/order";
import {HttpClientTestingModule} from "@angular/common/http/testing";

describe('OrderService', () => {
  const MOCKED_ORDER: Order = {
    name: 'Alojz',
    email: 'Novak',
    number: '123456789',
    payment: Payment.CARD,
    delivery: Delivery.PPL,
    shoppingCart: []
  }
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        OrderService,
        {
          provide: OrderStorageService, useValue: jasmine.createSpyObj(
            ['storeOrder']
          )
        }
      ]
    })
  })

  it('should be created', () => {
    const service: OrderService = TestBed.inject(OrderService);
    expect(service)
      .toBeTruthy();
  })

  it('should call storeOrder method with MOCKED_ORDER as a parameter', inject([OrderStorageService, OrderService],
    (storeService: OrderStorageService, service: OrderService) => {

      service.order = JSON.parse(JSON.stringify(MOCKED_ORDER));
      service.storeOrder();
      expect(storeService.storeOrder)
        .toHaveBeenCalledOnceWith(MOCKED_ORDER);
    })
  )
})
