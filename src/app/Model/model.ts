export interface Product {
    id: number;
    name: string;
    price: number;
    nuts: boolean;
    image: string;
    vegeterian: boolean;
    spiciness: number;
    catedoryId: number;
  }
  
  export interface Category {
    id: number;
    name: string;
  }
  
  export interface GetCategoriesResponse {
    id: number;
    name: string;
  }
  
  export interface GetAllProductsResponse {
    id: number;
    name: string;
    price: number;
    nuts: boolean;
    image: string;
    vegeterian: boolean;
    spiciness: number;
    catedoryId: number;
  }
  
  export interface GetProductsByCategoryResponse {
    id: number;
    name: string;
    products: Product[];
  }
  
  export interface FilteredCategory {
    id: number;
    name: string;
    products: Product[];
  }
  
  export interface ProductById {
    id: number;
    name: string;
    products: Product[];
  }
  
  export interface FiltersForm {
    spiciness: number;
    nuts: boolean;
    vegeterian: boolean;
  }
  
  export interface GetProdByFilters {
    id: number;
    name: string;
    price: number;
    nuts: boolean;
    image: string;
    vegeterian: boolean;
    spiciness: number;
    catedoryId: number;
  }
  
  export interface ProductBasket {
    quantity: number;
    price: number;
    productId: number;
  }
  
  export interface GetUpdate {
    id: number;
    name: string;
    price: number;
    nuts: boolean;
    image: string;
    vegeterian: boolean;
    spiciness: number;
    catedoryId: number;
  }
  
  export interface ProductById {
    id: number;
    name: string;
    products: Product[];
  }
  
  export interface AddBasketForm {
    quantity: number;
    price: number;
    productId: number;
  }
  
  export interface DeleteProductResponse {
    quantity: number;
    price: number;
    product: Product;
  }
  
  export interface BasketPutResponse {
    id: number;
    name: string;
    price: number;
    nuts: boolean;
    image: string;
    vegeterian: boolean;
    spiciness: number;
    catedoryId: number;
  }
  export interface BasketProductResponse {
    quantity: number;
    price: number;
    product: Product;
  }
  