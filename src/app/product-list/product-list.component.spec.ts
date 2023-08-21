import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProductListComponent } from './product-list.component';
import { ProductService } from '../service/product-service.service';
import { of } from 'rxjs';

describe('ProductListComponent', () => {
  let component: ProductListComponent;
  let fixture: ComponentFixture<ProductListComponent>;
  let productService: jasmine.SpyObj<ProductService>;

  beforeEach(() => {
    productService = jasmine.createSpyObj('ProductService', ['getProducts']);

    TestBed.configureTestingModule({
      declarations: [ProductListComponent],
      providers: [{ provide: ProductService, useValue: productService }],
    }).compileComponents();

    fixture = TestBed.createComponent(ProductListComponent);
    component = fixture.componentInstance;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should load products on initialization', () => {
    const mockProducts = [
      {
        id: 1,
        title: 'Product 1',
        description: 'Description 1',
        price: 10,
        image: 'image1.jpg',
      },
      {
        id: 2,
        title: 'Product 2',
        description: 'Description 2',
        price: 20,
        image: 'image2.jpg',
      },
    ];

    productService.getProducts.and.returnValue(of(mockProducts));

    fixture.detectChanges();

    expect(component.products).toEqual(mockProducts);
  });
});
