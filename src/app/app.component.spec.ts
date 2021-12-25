import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import {BottlesService} from "./services/shop/bottles.service";
import {ShoppingListService} from "./services/shopping-list/shopping-list.service";

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        AppComponent
      ],
      providers:[
        {provide: BottlesService, useValue: jasmine.createSpy()},
        {provide: ShoppingListService, useValue: jasmine.createSpy()}

      ]
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'webstranka'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('webstranka');
  });
});
