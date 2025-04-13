import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { BasketComponent } from './pages/basket/basket.component';
import {ProductPageComponent} from './pages/product-page/product-page.component';
import {LoginComponent} from './pages/login/login.component';
import {AccountComponent} from './pages/account/account.component';

export const routes: Routes = [
    {path:"", component: HomeComponent},
    {path: "basket", component: BasketComponent},
    {path: "login", component: LoginComponent},
    {path: "account", component: AccountComponent},
    {path:":id", component: ProductPageComponent},
];
