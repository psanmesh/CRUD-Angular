import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { ProductOrderListComponent } from "./product-order-list/product-order-list.component";
import { ProductOrderEditComponent } from "./product-order-edit/product-order-edit.component";

const routes: Routes = [
  { path: "", redirectTo: "/summary", pathMatch: "full" },
  { path: "summary", component: ProductOrderListComponent },
  { path: "new", component: ProductOrderEditComponent },
  { path: "edit/:id", component: ProductOrderEditComponent },
  {
    path: "**",
    component: ProductOrderListComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
