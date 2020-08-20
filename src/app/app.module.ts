import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppRoutingModule } from "./app-routing.module";
import { FormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";

import { AppComponent } from "./app.component";
import { ProductOrderEditComponent } from "./product-order-edit/product-order-edit.component";
import { ProductOrderListComponent } from "./product-order-list/product-order-list.component";

@NgModule({
  declarations: [
    AppComponent,
    ProductOrderEditComponent,
    ProductOrderListComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, FormsModule, HttpClientModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
