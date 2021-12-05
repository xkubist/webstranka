import {TestBed} from "@angular/core/testing";
import {OrderStorageService} from "./order.storage.service";
import {Delivery, Order, Payment} from "./models/order.model";
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

describe('order storage service tests', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [HttpClientTestingModule],
    providers: [
      OrderStorageService,
    ]
  }))

  it('should be created',() =>
  {
    const service: OrderStorageService = TestBed.inject(OrderStorageService);
    expect(service).toBeTruthy();
  })

  it('should call HttpClient post request with given data',() =>
  {
    const service: OrderStorageService = TestBed.inject(OrderStorageService);
    const httpTestingController: HttpTestingController = TestBed.inject(HttpTestingController);
    service.storeOrder(SAMPLE_ORDER);
    const req = httpTestingController.expectOne(ORDER_WEB_ADDRESS);
    expect(req.request.method).toEqual("PUT");
    expect(req.request.body).toEqual(SAMPLE_ORDER);

  })

  // it('should call HttpClient get request',() =>
  // {
  //   const service: OrderStorageService = TestBed.inject(OrderStorageService);
  //   const client: HttpClient = TestBed.inject(HttpClient);
  //   service.fetchOrder();
  //   expect(client.get)
  //     .toHaveBeenCalledOnceWith(ORDER_WEB_ADDRESS);
  // })
})
