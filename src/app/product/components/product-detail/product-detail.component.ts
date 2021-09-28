import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Params } from "@angular/router";
import { ProductsService } from "./../../../core/services/products/products.service";
import { Product } from "./../../../core/models/product.model";

@Component({
  selector: "app-product-detail",
  templateUrl: "./product-detail.component.html",
  styleUrls: ["./product-detail.component.scss"],
})
export class ProductDetailComponent implements OnInit {
  product: Product;
  constructor(
    private route: ActivatedRoute,
    private productsService: ProductsService
  ) { }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      const id = params.id;
      this.fetchProduct(id);
      // this.product = this.productsService.getProduct(id);
    });
  }

  fetchProduct(id: string) {
    this.productsService.getProduct(id).subscribe((product) => {
      this.product = product;
    });
  }

  crearProducto() {
    const newProduct: Product = {
      id: "15",
      title: "iphone 15",
      price: 1500,
      description: "nuevo iphone 12",
      image:
        "C:UsersMathias PodestaDocumentsAngularplatzi-store-32-httpsrcassetsimages\banner-1.jpg",
    };
    this.productsService.createProduct(newProduct).subscribe((product) => {
      console.log(product);
    });
  }

  updateProducto() {
    const newProduct: Partial<Product> = {
      id: "1",
      title: "iphone 13 MAX PRO",
    };

    this.productsService.updateProduct(newProduct.id, newProduct).subscribe(product => {
      console.log(product)
    })
  }

  deleteProducto() {
    const id = '2';
    this.productsService.deleteProduct(id).subscribe(data => {
      console.log(data)
    })
  }
}
