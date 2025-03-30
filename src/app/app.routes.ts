import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { BasketComponent } from './pages/basket/basket.component';

export const routes: Routes = [
    {path:"", component: HomeComponent},
    {path: "basket", component: BasketComponent},
    {path:"**", component: NotFoundComponent},
];
