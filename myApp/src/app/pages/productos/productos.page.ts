import { Component, OnInit, ChangeDetectorRef, NgZone } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, Validators, ReactiveFormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonList, IonItemSliding, IonItem, IonLabel, IonNote, IonItemOptions, IonItemOption, IonIcon, IonFab, IonFabButton, IonInfiniteScroll, IonInfiniteScrollContent, IonModal, IonCard, IonCardContent, IonInput, IonButton, IonText, IonTextarea } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { create, trash, add } from 'ionicons/icons';
import { ProductoService, Producto } from '../../services/producto';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.page.html',
  styleUrls: ['./productos.page.scss'],
  standalone: true,
  imports: [
    IonContent, 
    IonHeader, 
    IonTitle, 
    IonToolbar, 
    CommonModule, 
    FormsModule,
    ReactiveFormsModule,
    IonList,
    IonItemSliding,
    IonItem,
    IonLabel,
    IonNote,
    IonItemOptions,
    IonItemOption,
    IonIcon,
    IonFab,
    IonFabButton,
    IonInfiniteScroll,
    IonInfiniteScrollContent,
    IonModal,
    IonCard,
    IonCardContent,
    IonInput,
    IonButton,
    IonText,
    IonTextarea
  ]
})
export class ProductosPage implements OnInit {
  productos: Producto[] = [];
  visibleProductos: Producto[] = [];
  pageSize = 10;
  currentIndex = 0;
  showModal = false;
  productForm: FormGroup;
  editingProduct: Producto | null = null;
  validation_messages = {
    nombre: [
      { type: 'required', message: 'El nombre es obligatorio' }
    ],
    descripcion: [
      { type: 'required', message: 'La descripción es obligatoria '}
    ],
    precio: [
      { type: 'required', message: 'El precio es obligatorio' },
      { type: 'min', message: 'El precio debe ser mayor a 0' }
    ],
    stock: [
      { type: 'required', message: 'El stock es obligatorio' },
      { type: 'min', message: 'El stock no puede ser negativo' }
    ]
  };

  // Helper para mostrar si un control es inválido y fue tocado
  isInvalid(controlName: string): boolean {
    const control = this.productForm.get(controlName);
    return !!(control && control.invalid && (control.dirty || control.touched));
  }

  hasError(controlName: string, errorType: string): boolean {
    const control = this.productForm.get(controlName);
    return !!(control && control.hasError(errorType) && (control.dirty || control.touched));
}

  constructor(
    private productoService: ProductoService,
    private fb: FormBuilder,
    private alertCtrl: AlertController,
    private cd: ChangeDetectorRef,
    private ngZone: NgZone
  ) {
    addIcons({ create, trash, add });

    this.productForm = this.fb.group({
      nombre: ['', Validators.required],
      descripcion: [''],
      precio: ['', [Validators.required, Validators.min(1)]],
      stock: ['', [Validators.required, Validators.min(0)]]
    });
  }

  ngOnInit() {
    this.loadProducts();
  }

  loadProducts() {
    this.productoService.getProductos().subscribe({
      next: (res) => {
        this.productos = res.reverse();
        this.loadInitial();
      },
      error: (err) => {
        console.error('Error cargando productos', err);
      }
    });
  }

  // Primera carga
  loadInitial() {
    this.visibleProductos = this.productos.slice(0, this.pageSize);
    this.currentIndex = this.pageSize;
  }

  // Carga más productos al hacer scroll
  loadMore(event: any) {
    const nextProducts = this.productos.slice(
      this.currentIndex,
      this.currentIndex + this.pageSize
    );

    this.visibleProductos = [...this.visibleProductos, ...nextProducts];
    this.currentIndex += this.pageSize;

    event.target.complete();

    // Si ya no hay más productos, se desactiva el infinite scroll
    if (this.currentIndex >= this.productos.length) {
      event.target.disabled = true;
    }
  }

  // Abrir modal para nuevo producto
  openNewProduct() {
    this.editingProduct = null;
    this.productForm.reset();
    this.showModal = true;
  }

  // Abri modal para editar producto
  openEditProduct(product: Producto, slidingItem: IonItemSliding) {
    this.editingProduct = product;
    this.productForm.patchValue(product);
    this.showModal = true;
    slidingItem.close();
  }

  // Guardar producto (crear o editar)
  saveProduct() {
    if (this.productForm.valid) {
      const formValue = this.productForm.value;

      if (!this.editingProduct) {
        this.productoService.createProducto(this.productForm.value).subscribe({
          next: () => {
            this.showModal = false;
            this.loadProducts();
          },
          error: (err) => console.error('Error creando producto', err),
        });
      } else {
        this.productoService.updateProducto(this.editingProduct.id, formValue).subscribe({
          next: () => {
            this.showModal = false;
            this.loadProducts();
          },
          error: (err) => console.error('Error actualizando producto', err),
        });
      }
    }
  }

  // Eliminar producto
  async deleteProduct(product: Producto, slidingItem: IonItemSliding) {
    await slidingItem.close();
    const alert = await this.alertCtrl.create({
      header: 'Confirmar',
      subHeader: product.nombre,
      message: '¿Seguro que deseas eliminar este producto?',
      buttons: [
        { text: 'Cancelar', role: 'cancel' },
        { text: 'Eliminar', role: 'destructive', handler: () => {
          this.productoService.deleteProducto(product.id).subscribe({
            next: () => {
              this.ngZone.run(() => {
                this.productos = this.productos.filter(p => p.id !== product.id);
                if (this.currentIndex > this.productos.length) {
                  this.currentIndex = this.productos.length;
                }
                
                this.visibleProductos = this.productos.slice(0, this.currentIndex);

                this.cd.detectChanges();
              });
            },
              error: (err) => console.error('Error eliminando producto', err),
            });
          }
        }
      ]
    });
    await alert.present();
  }
}