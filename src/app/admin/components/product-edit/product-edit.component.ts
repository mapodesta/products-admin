import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms"
import { ProductsService } from "../../../core/services/products/products.service"
import { Router, ActivatedRoute, Params } from "@angular/router"
import { MyValidator } from "../../../../utils/validators"
import { Product } from 'src/app/core/models/product.model';

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.scss']
})
export class ProductEditComponent implements OnInit {

  id: string
  product: Product
  form: FormGroup
  constructor(
    private formBuilder: FormBuilder,
    private productsService: ProductsService,
    private router: Router,
    private activeRouter: ActivatedRoute
  ) {
    this.buildForm()
  }

  ngOnInit() {
    this.activeRouter.params.subscribe((data: Params) => {

      this.id = data.id
      this.productsService.getProduct(this.id).subscribe(data => {

        this.product = data
        this.form.patchValue({ title: this.product.title, price: this.product.price, image: this.product.image, description: this.product.description })
      })
    })
  }

  private buildForm() {
    this.form = this.formBuilder.group({
      title: ['', [Validators.required]],
      price: [0, [Validators.required, MyValidator.isPriceValid]],
      image: '',
      description: ['', [Validators.required]],
    })
  }

  editarProducto(event: Event) {
    event.preventDefault()
    console.log(this.form.value)
    const product = this.form.value
    this.productsService.updateProduct(this.id, product).subscribe(data => {
      console.log(data)
      this.router.navigate(['./admin/products'])
    })
  }

}
