import { Component } from '@angular/core';
import { ProductServiceService } from '../product-service.service';
import { ActivatedRoute } from '@angular/router';
import { AddBasketForm, ProductBasket, Product } from '../Model/model';

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.scss'],
})
export class BasketComponent {
  basketProducts: any = [];
  basketProduct: ProductBasket;
  product: Product;
  totalBasketPrice: number = 0;

  showAll() {
    this.productService.getAllProductsFromBasket().subscribe((response) => {
      this.basketProducts = response;
      this.totalPrice = 0;
      this.basketProducts.map((basketProduct: BasketProduct) => {
        this.totalPrice += basketProduct.price * basketProduct.quantity;
      });
    });
  }

  basketTotal: any;

  // calculateTotalPrice() {
  // this.basketTotal=0;
  // for (let basketProduct of this.basketProducts) {
  //   this.totalPrice = (this.basketProduct.price * this.basketProduct.quantity)
  //   this.basketTotal += this.totalPrice;
  // };
  // }

  totalPrice: any;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductServiceService
  ) {
    this.productService.getAllProductsFromBasket().subscribe((response) => {
      this.basketProducts = response;

      this.totalPrice = 0;
      this.basketProducts.map((basketProduct: BasketProduct) => {
        this.totalPrice += basketProduct.price * basketProduct.quantity;
      });

      //  for (let basketProduct of this.basketProducts) {
      //   this.totalBasketPrice=0;
      //  this.totalPrice= (this.basketProduct.quantity*this.basketProduct.price)
      //   this.totalBasketPrice += this.totalPrice
      //  }

      console.log(this.basketProduct);
    });
  }

  addP: AddBasketForm = {
    quantity: 0,
    price: 0,
    productId: 0,
  };

  // submitForUpdatePlus(basketProduct: BasketProduct) {
  //   this.productService
  //     .updateProductsBasketPlused(basketProduct)
  //     .subscribe((response) => {
  //       this.basketProduct.productId = response.id;
        
        
  //     });this.showAll()
  //   console.log(basketProduct);
  // }

  submitForUpdatePlus(basketProduct:BasketProduct){
    this.productService.updateProductsBasketPlused(basketProduct).subscribe(() => this.showAll());
  }

  submitForUpdateMinus(basketProduct:BasketProduct){
    this.productService.updateProductsBasketMinus(basketProduct).subscribe(()=>this.showAll())
  }

  // submitForUpdateMinus(basketProduct: BasketProduct) {
  //   this.productService
  //     .updateProductsBasketMinus(basketProduct)
  //     .subscribe((response) => {
  //       this.basketProducts.basketProduct = response;
  //       // this.basketProduct.quantity-=1
  //       // this.showAll()
  //     });
  //   console.log(basketProduct);
  // }

  // onDeleteClick(id:number){
  //     this.productService.deleteProducts(id).subscribe((response)=>{
  //       this.basketProducts = response
  //       this.calculateTotal()
  //      this.showAll()

  //       console.log(response)
  //     })

  //   }

  delFunc(id: number) {
    this.productService.deleteProducts(id).subscribe(() => this.showAll());
  }

  // calculateTotal() {
  //   this.totalPrice=0;
  //   this.basketProducts.map((basketProduct:BasketProduct) => {

  //     this.totalPrice += basketProduct.price*basketProduct.quantity;
  //     this.showAll();

  //   });}
}

export interface BasketProduct {
  quantity: number;
  price: number;
  product: Product;
}

// import {  AddProductRequest, BasketRequest, Category, Product, ProductById } from 'src/app/model/category';
// import {
//   AllServicesService,
//   GetAllProductsResponse,
//   FiltersForm,
//   AddBasketForm,
//   UpdateBasket,
//   BasketProduct,
//   ProductBasket
// } from '../services/all-services.service';
