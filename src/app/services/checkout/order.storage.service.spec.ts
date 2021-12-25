import {inject, TestBed} from "@angular/core/testing";
import {OrderStorageService} from "./order.storage.service";
import {Delivery, Order, Payment} from "../../checkout/models/order";
import {HttpClientTestingModule, HttpTestingController} from "@angular/common/http/testing";

const SAMPLE_ORDER: Order = {
  name: 'Alojz',
  email: 'Novak',
  number: '123456789',
  payment: Payment.CARD,
  delivery: Delivery.PPL,
  shoppingCart: []
}

const ORDER_WEB_ADDRESS: string = 'https://webstranka-45787-default-rtdb.europe-west1.firebasedatabase.app/order.json';

describe('OrderStorageService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [HttpClientTestingModule],
    providers: [
      OrderStorageService,
    ]
  }))

  it('should be created', () => {
    const service: OrderStorageService = TestBed.inject(OrderStorageService);
    expect(service).toBeTruthy();
  })

  it('should call HttpClient post request with ORDER_WEB_ADDRESS and SAMPLE_ORDER as parameters', inject([HttpTestingController, OrderStorageService],
    (httpTestingController: HttpTestingController, service: OrderStorageService) => {
      service.storeOrder(SAMPLE_ORDER);

      const req = httpTestingController.expectOne(ORDER_WEB_ADDRESS);
      expect(req.request.method).toEqual("PUT");
      expect(req.request.body).toEqual(SAMPLE_ORDER);

    })
  )

  it('should call HttpClient get request with ORDER_WEB_ADDRESS as parameters and get correct data', inject([HttpTestingController, OrderStorageService],
    (httpTestingController: HttpTestingController, service: OrderStorageService) => {
      service.fetchOrder().then((order) => {
        expect(order).toEqual(SAMPLE_ORDER);
      })

      const req = httpTestingController.expectOne(ORDER_WEB_ADDRESS);
      expect(req.request.method).toEqual("GET");
      req.flush(SAMPLE_ORDER);
    })
  )
})
