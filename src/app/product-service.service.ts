
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Category,Product,GetCategoriesResponse,GetAllProductsResponse,GetProductsByCategoryResponse,GetProdByFilters,
         FiltersForm,ProductBasket,GetUpdate,ProductById,AddBasketForm,DeleteProductResponse,BasketProductResponse } from './Model/model';
import { BasketProduct } from './basket/basket.component';

@Injectable({
  providedIn: 'root'
})
export class ProductServiceService {

  apiUrl = 'https://restaurant.webwide.ge/api/Categories/GetAll';
  apiUrlGetAllProducts = 'https://restaurant.webwide.ge/api/Products/GetAll';
  apiUrlProductsByCategory = `https://restaurant.webwide.ge/api/Categories/GetCategory`;
  apiUrlProductsByFilters = `https://restaurant.webwide.ge/api/Products/GetFiltered?`;
  apiUrlAddToBasket = 'https://restaurant.webwide.ge/api/';

  categories: Category[] = [];
  products: Product[] = [];
  productsByid: ProductById[] = [];

  // data:any;
  data: AddBasketForm;

  headers = {
    Accept: 'text/plain',
    'Content-Type': 'application/json',
  };

  headersPut = {
    'accept': '*/*',
    'Content-Type': 'application/json'
  }

  constructor(private http: HttpClient) {}

  getAllCategories() {
    return this.http.get<GetCategoriesResponse[]>(`${this.apiUrl}`);
  }

  getAllProducts() {
    return this.http.get<GetAllProductsResponse[]>(
      `${this.apiUrlGetAllProducts}`
    );
  }

  getProductsByCategory(id: number) {
    return this.http.get<GetProductsByCategoryResponse>(
      `${this.apiUrlProductsByCategory}/${id}`
    );
  }

  getProductsByFilters(vegeterian: boolean, nuts: boolean, spiciness: number) {
    var searchParams: URLSearchParams = new URLSearchParams();
    if (nuts == true) {
      searchParams.append('nuts', 'false');
    }

    if (spiciness !== -1) {
      searchParams.append('spiciness', spiciness.toLocaleString());
    }

    if (vegeterian == true) {
      searchParams.append('vegeterian', 'true');
    }

    return this.http.get<GetProdByFilters[]>(
      `${this.apiUrlProductsByFilters}${searchParams.toString()}`
    );
  }

  updateProductsBasketMinus(basketProduct:BasketProduct){
      if(basketProduct.quantity>1){
       basketProduct.quantity -=1 ;
    }
    
    this.data ={
      quantity:basketProduct.quantity,
      price:basketProduct.price,
      productId:basketProduct.product.id
    };
    
  
    return this.http.put<GetUpdate>(
      this.apiUrlAddToBasket+'Baskets/UpdateBasket',
      JSON.stringify(this.data),{headers:this.headers}
    );
  }


  addProductToBasket(product: ProductBasket) {
    this.data = {
      quantity: 1,
      price: product.price,
      productId: product.productId,
    };
  
    
      

    return this.http.post<GetAllProductsResponse>(
      this.apiUrlAddToBasket + 'Baskets/AddToBasket',
      JSON.stringify(this.data),
      { headers: this.headers }
    );


  }


  updateProductsBasketPlus(basketProduct:ProductBasket){
   
    this.data ={
      quantity:basketProduct.quantity,
      price:basketProduct.price,
      productId:basketProduct.productId
    };
    basketProduct.quantity+=1;

    return this.http.put<GetUpdate>(
      this.apiUrlAddToBasket+'Baskets/UpdateBasket',
      JSON.stringify(this.data),{headers:this.headers}
    );
  }

  updateProductsBasketPlused(basketProduct:BasketProduct){ 
    basketProduct.quantity+=1;
    this.data ={
      quantity:basketProduct.quantity,
      price:basketProduct.price,
      productId:basketProduct.product.id
    };
   

    return this.http.put<GetUpdate>(
      this.apiUrlAddToBasket+'Baskets/UpdateBasket',
      JSON.stringify(this.data),{headers:this.headers}
    );
  }
  

  getAllProductsFromBasket(){
    return this.http.get<BasketProductResponse[]>(this.apiUrlAddToBasket+ 'Baskets/GetAll',{headers:this.headers})
  
    
   }
  
   deleteProducts(id:number){
    return this.http.delete<DeleteProductResponse[]>(`${this.apiUrlAddToBasket}Baskets/DeleteProduct/${id}`)
   }
}

