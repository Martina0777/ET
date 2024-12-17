import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage-angular';

@Component({
  selector: 'app-viaje-actual',
  templateUrl: './viaje-actual.page.html',
  styleUrls: ['./viaje-actual.page.scss'],
})
export class ViajeActualPage implements OnInit {
  viaje: any = null;

  constructor(private storage: Storage) {}

  async ngOnInit() {
    await this.storage.create(); // Inicializa el almacenamiento
    // Cargar el viaje seleccionado desde el almacenamiento local
    this.viaje = await this.storage.get('viaje_actual');
  }
}
