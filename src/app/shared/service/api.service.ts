import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { map } from "rxjs/operators";
@Injectable({
  providedIn: "root",
})
export class ApiService {
  readonly apiURL = "http://localhost:1863";

  httpOptions = {
    headers: new HttpHeaders({ "Content-Type": "application/json" }),
  };

  constructor(private http: HttpClient) {}

  getProductList() {
    let url = `${this.apiURL}/api/Assignment/ProductList`;
    return this.http.get(url);
  }

  onAddOrEditProductOrder(Order) {
    let url = `${this.apiURL}/api/Assignment/AddOrEditOrder`;
    return this.http.post(url, Order);
  }

  onDeleteProductOrder(Order) {
    let url = `${this.apiURL}/api/Assignment/DeleteOrder`;
    return this.http.post(url, Order);
  }

  getProductOrderSummary() {
    let url = `${this.apiURL}/api/Assignment/ProductOrderList`;
    return this.http.get(url);
  }

  getProductOrderDetail(Order) {
    let url = `${this.apiURL}/api/Assignment/ProductOrderDetail`;
    return this.http.post(url, Order);
  }
}
