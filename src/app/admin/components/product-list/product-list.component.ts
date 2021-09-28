import { Component, OnInit } from "@angular/core";
import { ProductsService } from "../../../core/services/products/products.service";
import { Product } from "../../../core/models/product.model";
@Component({
  selector: "app-product-list",
  templateUrl: "./product-list.component.html",
  styleUrls: ["./product-list.component.scss"],
})
export class ProductListComponent implements OnInit {
  products: Product[] = [];
  displayedColumns: string[] = ["id", "title", "price", "actions"];

  constructor(private productService: ProductsService) { }

  ngOnInit() {
    this.fetchProducts();
  }

  fetchProducts() {
    this.productService.getAllProducts().subscribe((data) => {
      this.products = data;
    });
  }

  eliminarProducto(id: string) {
    this.productService.deleteProduct(id).subscribe((data) => {
      this.products = this.products.filter(product => product.id !== id)
      this.fetchProducts();
    });
  }

  editar() {
    console.log("EDITAAA");
  }
}
