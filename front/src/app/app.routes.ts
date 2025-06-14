import {Routes} from "@angular/router";
import {HomeComponent} from "./shared/features/home/home.component";
import {ContactComponent} from "./shared/features/contact/contact.component";
import {LoginRegisterComponent} from "./shared/features/login-register/login-register.component";

export const APP_ROUTES: Routes = [
  {
    path: "home",
    component: HomeComponent,
  },
  {
    path: "contactForm",
    component: ContactComponent,
  },
  {
    path: 'auth',
    component: LoginRegisterComponent
  },
  {
    path: "products",
    loadChildren: () =>
      import("./products/products.routes").then((m) => m.PRODUCTS_ROUTES)
  },
  {path: '', redirectTo: 'auth', pathMatch: 'full'}
];
