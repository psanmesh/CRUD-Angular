import { Component, OnInit } from "@angular/core";
import { ApiService } from "../shared/service/api.service";
import { ProductOrder } from "../shared/model/product-order.model";
import { ResponseMessage } from "../shared/model/response-message.model";
import { Router, ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-product-order-list",
  templateUrl: "./product-order-list.component.html",
  styleUrls: ["./product-order-list.component.css"],
})
export class ProductOrderListComponent implements OnInit {
  productOrderList: ProductOrder[];
  orderDetail: ProductOrder;
  constructor(
    private api: ApiService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.fetchProductOrderList();
  }

  ngOnInit(): void {}

  fetchProductOrderList() {
    this.api.getProductOrderSummary().subscribe((response: ProductOrder[]) => {
      this.productOrderList = [];
      this.productOrderList = response;
    });
  }

  onDelete(ID) {
    this.orderDetail = new ProductOrder();
    this.orderDetail.ID = ID;
    var r = confirm("Delete selected order?");
    if (r == true) {
      this.api
        .onDeleteProductOrder(this.orderDetail)
        .subscribe((response: ResponseMessage) => {
          if (response.Status == 1) {
            alert(response.Message);
            this.fetchProductOrderList();
          } else {
            alert(response.Message);
          }
        });
    } else {
      return;
    }
  }

  onEdit(ID) {
    this.router.navigate(["edit", ID]);
  }
}
