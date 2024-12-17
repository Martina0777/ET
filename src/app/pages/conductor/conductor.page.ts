import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { getFirestore, collection, addDoc } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

@Component({
  selector: 'app-conductor',
  templateUrl: './conductor.page.html',
  styleUrls: ['./conductor.page.scss'],
})
export class ConductorPage {
  destination: string = '';
  capacity: number | null = null;
  cost: number | null = null;
  salida: string='';

  constructor() { }

  async crearViaje() {
    try {
      if (!this.destination || !this.capacity || !this.cost || !this.salida) {
        alert('Por favor, completa todos los campos.');
        return;
      }

      const auth = getAuth();
      const user = auth.currentUser;

      if (!user) {
        alert('Debes estar autenticado para generar un viaje.');
        return;
      }
      //la base de datos de los viajes
      const db = getFirestore();
      const viajesRef = collection(db, 'viajes');

      await addDoc(viajesRef, {
        destino: this.destination,
        capacidad: this.capacity,
        costo: this.cost,
        conductorID: user.uid,
        disponibilidad: this.capacity, 
        salida: this.salida,
      });
    alert('¡Viaje publicado exitosamente!');
    this.limpiarFormulario();
    } catch (error) {
      console.error('Error al crear el viaje:', error);
      alert('Hubo un error al crear el viaje. Intenta nuevamente.');
    }
  }
  
  limpiarFormulario() {
    this.destination = '';
    this.capacity = null;
    this.cost = null;
    this.salida = '';
  }
}