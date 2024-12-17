import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { Storage } from '@ionic/storage-angular';
import { Router } from '@angular/router';
import { getFirestore, collection, getDocs, doc, setDoc } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

@Component({
  selector: 'app-viajes',
  templateUrl: './viajes.page.html',
  styleUrls: ['./viajes.page.scss'],
})
export class ViajesPage implements OnInit {

  viajes: any[] = []; 

  async ngOnInit() {
    try {
      const db = getFirestore();

      // Obtener la colección de viajes desde Firestore
      const viajesSnapshot = await getDocs(collection(db, 'viajes'));

      this.viajes = viajesSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      console.log('Viajes disponibles:', this.viajes);
    } catch (error) {
      console.error('Error al cargar los viajes:', error);
      alert('Hubo un error al cargar los viajes disponibles.');
    }
  }

  constructor() { }

  reservarViaje(viajeId: string, viaje: any) {
    const db =getFirestore();
    const auth = getAuth();
    const user = auth.currentUser;

    if (user) {
      const reservaRef = doc(db, 'reservas', `${user.uid}_${viajeId}`);

      try {
        //await
         setDoc(reservaRef, {
          viajeId: viajeId,
          destino: viaje.destino,
          salida: viaje.salida,
          capacidad: viaje.capacidad,
          costo: viaje.costo,
          usuarioId: user.uid,
          nombre: user.displayName || 'No nombre',
          email: user.email,
        });
        alert('Viaje reservado');

        console.log('Reserva guardada correctamente');
        
       

      } catch (error) {
        console.error('Error al guardar la reserva:', error);
        alert('Error al realizar la reserva.');
      }
    } else {
      alert('Por favor, inicia sesión para hacer la reserva');
    }
  }

  
}
