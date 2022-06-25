import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';
import { Product } from 'src/app/models/Product';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  cartList: Product[];
  count: string;
  constructor(private cartService: CartService, private productService: ProductService) {
    this.cartList = [
      {id: 0,
      name: '',
      price: 0,
      url: 'https://www.example.com',
      description: '',
      addedItem: ''
      }
    ];
    this.count = '';
  }

  ngOnInit(): void {
    this.cartList = this.cartService.getCartItems();
  }
  
  changeCount(e: Event, id: number) {
    this.count = (<HTMLSelectElement>e.target).value;
      let myIndex = this.cartList.findIndex(i=>i.id === id);
    this.cartService.updateProduct(myIndex, this.count);
    
    if (this.count === '0') {
      this.cartList = this.cartList.filter(product=>product.id !==id);
       this.cartList = [...new Map(this.cartList.map(v => [v.id, v])).values()]
      alert('Removed from cart');
    }


   
  }
}
