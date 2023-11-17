import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Category,Product } from '../Model/model';
import { HttpClient } from '@angular/common/http';
import { ProductServiceService} from '../product-service.service';
import { FiltersForm,ProductBasket } from '../Model/model';


@Component({
  selector: 'app-product-page',
  templateUrl: './product-page.component.html',
  styleUrls: ['./product-page.component.scss']
})
export class ProductPageComponent {

  showloader : boolean = true
  productShow: boolean = true;
  productByIdShow: boolean = false;
  productByFilterShow: boolean = false;
  productByFiltersShow: boolean = false
  categories: Category[] = [];
  products: Product[] = [];
  productsByCatId: Product[] = [];
  productBFA: Product[];
  // productBFA :any;
  basketProducts:any=[]
  postProducts : any={}
  productToAdd : ProductBasket;
  // productToAdd :any;


  filterForm: FiltersForm = {
    spiciness: -1,
    nuts: false,
    vegeterian: false,
  };







constructor(
  private route: ActivatedRoute,
  private productService: ProductServiceService
) 
{
  this.productService.getAllProducts().subscribe((response) => {
    this.products = response;
    this.showloader = false
  });

  this.productService.getAllCategories().subscribe((response) => {
    this.categories = response;
    this.showloader = false
  });
}

  

getProductsById(id: number) {
  this.productShow = false;
  this.productByIdShow = true;
  this.showloader = false
  this.productByFilterShow = false;
  this.productService.getProductsByCategory(id).subscribe((response) => {
  this.productsByCatId = response.products;
  });
}

getAllPr() {
  this.productByIdShow = false;
  this.productShow = true;
  this.showloader = false
  this.productByFilterShow = false;
  this.productService.getAllProducts().subscribe((response) => {
    this.products = response;
  });
}

onSubmit(vegeterian: boolean, nuts: boolean, spiciness: number) {
  this.productShow = false;
  this.productByIdShow = false;
  this.productByFilterShow = true;
  this.showloader = false

  this.productService
    .getProductsByFilters(vegeterian, nuts, spiciness)
    .subscribe((response) => {
      this.productBFA = response;

     
    });
}





submitAddtoCart(product:Product){
  this.productToAdd={
    quantity:1,
    price:product.price,
    productId:product.id

  }

  this.productService.getAllProductsFromBasket().subscribe(response=>{
    console.log(response);
    this.basketProducts=response;
     const productCheckExists = this.basketProducts.find(item=>item.product.id === product.id)

     if(productCheckExists){
      this.productToAdd.quantity+=productCheckExists.quantity
      this.productService.updateProductsBasketPlus(this.productToAdd).subscribe(response=>{
        console.log(response)
      })
     }else{
      this.productService.addProductToBasket(this.productToAdd).subscribe(response=>{
        this.postProducts=response
      })
     }

  })
}




}