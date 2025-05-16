import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { BasketComponent } from './pages/basket/basket.component';
import {ProductPageComponent} from './pages/product-page/product-page.component';
import {LoginComponent} from './pages/login/login.component';
import {AccountComponent} from './pages/account/account.component';
import {authGuard, publicGuard} from './guard/auth.guard';
import {MyFavoritesComponent} from './pages/my-favorites/my-favorites.component';
import {PlaceOrderComponent} from './pages/place-order/place-order.component';

export const routes: Routes = [
    {path:"", component: HomeComponent},
    {path: "basket", component: BasketComponent, canActivate:[authGuard]},
    {path: "login", component: LoginComponent, canActivate:[publicGuard]},
    {path: "account", component: AccountComponent, canActivate:[authGuard]},
    {path: "myFavorites", component: MyFavoritesComponent, canActivate:[authGuard]},
    {path: "placeOrder", component: PlaceOrderComponent, canActivate:[authGuard]},
    {path:":id", component: ProductPageComponent},
];
