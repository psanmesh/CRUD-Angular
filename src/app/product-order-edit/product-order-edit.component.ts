import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Product } from "../shared/model/product.model";
import { ApiService } from "../shared/service/api.service";
import { ProductOrder } from "../shared/model/product-order.model";
import { ResponseMessage } from "../shared/model/response-message.model";
import { Router, ActivatedRoute, Params } from "@angular/router";

@Component({
  selector: "app-product-order-edit",
  templateUrl: "./product-order-edit.component.html",
  styleUrls: ["./product-order-edit.component.css"],
})
export class ProductOrderEditComponent implements OnInit {
  productList: Product[];
  productOrder: ProductOrder;
  editproductOrder: ProductOrder;
  id: number;
  editMode: boolean;

  constructor(
    private api: ApiService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.fetchProductList();
    this.productOrder = new ProductOrder();
  }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.id = +params["id"];
      if (isNaN(this.id)) {
        this.id = 0;
      } else {
        this.fetchOrderDetail(this.id);
      }
    });
  }

  fetchProductList() {
    this.api.getProductList().subscribe((response: Product[]) => {
      this.productList = response;
    });
  }

  fetchOrderDetail(ID) {
    this.editproductOrder = new ProductOrder();
    this.editproductOrder.ID = ID;
    this.api
      .getProductOrderDetail(this.editproductOrder)
      .subscribe((response: ProductOrder) => {
        this.productOrder = response;
        console.log(response);
      });
  }

  getMRPforProduct(event) {
    const productID = event.target.value;
    for (let i = 0; i < this.productList.length; i++) {
      if (productID == this.productList[i].ID) {
        this.productOrder.MRP = this.productList[i].MRP;
      }
    }
  }

  setAmount() {
    this.productOrder.Amount = this.productOrder.MRP * this.productOrder.QTY;
    if (this.productOrder.Amount > 5000) {
      let disc = (5.36 * this.productOrder.Amount) / 100;
      this.productOrder.DiscountAmount = parseFloat(disc.toFixed(2));
    } else if (this.productOrder.Amount > 10000 && this.productOrder.QTY < 10) {
      let disc = (10.22 * this.productOrder.Amount) / 100;
      this.productOrder.DiscountAmount = parseFloat(disc.toFixed(2));
    } else if (this.productOrder.Amount > 10000 && this.productOrder.QTY > 10) {
      let disc = (12.25 * this.productOrder.Amount) / 100;
      this.productOrder.DiscountAmount = parseFloat(disc.toFixed(2));
    } else {
      this.productOrder.DiscountAmount = 0;
    }
    this.productOrder.PayableAmount =
      this.productOrder.Amount - this.productOrder.DiscountAmount;
  }

  onSave(order: NgForm) {
    this.productOrder.ID = this.id;
    this.api
      .onAddOrEditProductOrder(this.productOrder)
      .subscribe((response: ResponseMessage) => {
        if (response.Status == 1) {
          alert(response.Message);
          order.reset();
          this.router.navigate(["/summary"]);
        } else {
          alert(response.Message);
        }
      });
  }
}
