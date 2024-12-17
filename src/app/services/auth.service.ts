import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private afAuth: AngularFireAuth, private firestore: AngularFirestore) {}

  // Registrar usuario con correo electrónico
  register(email: string, password: string) {
    return this.afAuth.createUserWithEmailAndPassword(email, password);
  }

  // Método para guardar los datos del usuario en Firestore
  async saveUserData(user: any) {
    return this.firestore.collection('usuarios').doc(user.uid).set(user);
  }

  // Iniciar sesión con correo electrónico
  async login(email: string, password: string) {
    try {
      const credenciales = await this.afAuth.signInWithEmailAndPassword(email, password);

      // Verificar si el correo ha sido verificado
      if (credenciales.user?.emailVerified) {
        return credenciales;
      } else {
        throw new Error('Correo no verificado. Por favor, verifica tu correo antes de iniciar sesión.');
      }
    } catch (error) {
      console.error('Error al iniciar sesión:', error);
      throw error;
    }
  }

  // Cerrar sesión
  async logout() {
    try {
      await this.afAuth.signOut();
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
      throw error;
    }
  }
}
