import {Component, computed, inject, OnInit,} from "@angular/core";
import {Router, RouterModule} from "@angular/router";
import {SplitterModule} from 'primeng/splitter';
import {ToolbarModule} from 'primeng/toolbar';
import {PanelMenuComponent} from "./shared/ui/panel-menu/panel-menu.component";
import {OverlayPanelModule} from "primeng/overlaypanel";
import {Product} from "./products/data-access/product.model";
import {CartService} from "./products/data-access/cart.service";
import {DataViewModule} from "primeng/dataview";
import {CardModule} from "primeng/card";
import {Button} from "primeng/button";
import {BadgeModule} from "primeng/badge";
import {AuthService} from "./shared/features/auth.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
  standalone: true,
  imports: [RouterModule, SplitterModule, ToolbarModule, PanelMenuComponent, OverlayPanelModule, DataViewModule, CardModule, Button, BadgeModule],
})
export class AppComponent implements OnInit {
  title = "ALTEN SHOP";
  selectedProducts: Product[] = [];
  protected readonly cartService = inject(CartService);
  protected authService = inject(AuthService);
  private router = inject(Router);
  showLayout = computed(() => {
    const current = this.router.url;
    return current !== '/auth';
  });

  ngOnInit(): void {
    this.cartService.cartItems.subscribe(products => {
      this.selectedProducts = products;
    })
  }

  decreaseQty(product: Product) {
    this.cartService.updateQuantity(product, -1);
  }

  increaseQty(product: Product) {
    this.cartService.updateQuantity(product, 1);
  }

  removeItem(product: Product) {
    this.cartService.removeFromCart(product)
  }
}
