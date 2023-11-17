import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { BasketComponent } from './basket/basket.component';
import { ProductPageComponent } from './product-page/product-page.component';

const routes: Routes = [
  {path:'home', component:HomeComponent},
  {path: `basket`, component:BasketComponent},
  {path:'product-page', component:ProductPageComponent},
  {path:"", redirectTo:"home", pathMatch:"full"},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }










