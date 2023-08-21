import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CartComponent } from './cart.component';
import { CartService } from '../service/cart-service.service';
import { of } from 'rxjs';

describe('CartComponent', () => {
  let component: CartComponent;
  let fixture: ComponentFixture<CartComponent>;
  let cartService: jasmine.SpyObj<CartService>;

  beforeEach(() => {
    const cartServiceSpy = jasmine.createSpyObj('CartService', [
      'getCartItems',
    ]);

    TestBed.configureTestingModule({
      declarations: [CartComponent],
      providers: [{ provide: CartService, useValue: cartServiceSpy }],
    });

    fixture = TestBed.createComponent(CartComponent);
    component = fixture.componentInstance;
    cartService = TestBed.inject(CartService) as jasmine.SpyObj<CartService>;
  });

  it('should load cart items on initialization', () => {
    const mockCartItems = [
      {
        product: {
          id: 1,
          title: 'Product 1',
          description: 'Description 1',
          price: 10,
          image: 'image1.jpg',
        },
        quantity: 2,
      },
      {
        product: {
          id: 2,
          title: 'Product 2',
          description: 'Description 2',
          price: 20,
          image: 'image2.jpg',
        },
        quantity: 1,
      },
    ];

    cartService.getCartItems.and.returnValue(of(mockCartItems));
    fixture.detectChanges();

    component.cartItems$.subscribe((cartItems) => {
      expect(cartItems).toEqual(mockCartItems);
    });
  });
});
