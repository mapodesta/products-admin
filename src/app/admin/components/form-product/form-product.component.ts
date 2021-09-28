import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms"
import { ProductsService } from "../../../core/services/products/products.service"
import { Router } from "@angular/router"
import { MyValidator } from "../../../../utils/validators"
import { AngularFireStorage } from "@angular/fire/storage"
import { finalize } from "rxjs/operators"
import { Observable } from 'rxjs';
import { throwToolbarMixedModesError } from '@angular/material';
@Component({
  selector: 'app-form-product',
  templateUrl: './form-product.component.html',
  styleUrls: ['./form-product.component.scss']
})
export class FormProductComponent implements OnInit {

  image$: Observable<any>
  form: FormGroup
  constructor(
    private formBuilder: FormBuilder,
    private productsService: ProductsService,
    private router: Router,
    private angularFire: AngularFireStorage
  ) {
    this.buildForm()
  }

  ngOnInit() {
  }

  private buildForm() {
    this.form = this.formBuilder.group({
      id: ['', [Validators.required]],
      title: ['', [Validators.required]],
      price: [0, [Validators.required, MyValidator.isPriceValid]],
      image: '',
      description: ['', [Validators.required]],
    })
  }

  crearProducto(event: Event) {
    event.preventDefault()

    this.productsService.createProduct(this.form.value).subscribe(data => {

      this.router.navigate(['./admin/products'])
    })
  }

  uploadFiles(event) {
    const file = event.target.files[0]
    const dir = 'images'
    const fileRef = this.angularFire.ref(dir)
    const task = this.angularFire.upload(dir, file)
    task.snapshotChanges().pipe(
      finalize(() => {
        this.image$ = fileRef.getDownloadURL();
        this.image$.subscribe((url) => {
          this.form.get('image').setValue(url)
        })
      }
      )).subscribe()
  }
}
