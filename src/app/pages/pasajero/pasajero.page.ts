import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';

@Component({
  selector: 'app-pasajero',
  templateUrl: './pasajero.page.html',
  styleUrls: ['./pasajero.page.scss'],
})
export class PasajeroPage implements OnInit {
  viajes: any[] = [];

  constructor(private db: AngularFireDatabase) {}

  ngOnInit() {
    this.db.list('viajes').valueChanges().subscribe((viajes) => {
      this.viajes = viajes as any[];
    });
  }

  seleccionarViaje(viaje: any) {
    alert(`Seleccionaste el viaje: ${viaje.lugarPartida} - ${viaje.destino}`);
    // Aquí puedes implementar lógica adicional, como asignar al pasajero al viaje
  }
}
