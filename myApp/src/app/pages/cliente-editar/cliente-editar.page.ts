import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';

@Component({
  selector: 'app-cliente-editar',
  templateUrl: './cliente-editar.page.html',
  styleUrls: ['./cliente-editar.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class ClienteEditarPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
