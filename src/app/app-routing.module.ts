import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    loadChildren: () =>
      import('./pages/home/home.module').then((m) => m.HomePageModule),
   
  },
  {
    path: 'sign-up',
    loadChildren: () =>
      import('./pages/sign-up/sign-up.module').then((m) => m.SignUpPageModule),
  },
  {
    path: 'inicio',
    loadChildren: () =>
      import('./pages/inicio/inicio.module').then((m) => m.InicioPageModule),
  },
  {
    path: 'role-selection',
    loadChildren: () =>
      import('./pages/role-selection/role-selection.module').then(
        (m) => m.RoleSelectionPageModule
      ),
    canActivate: [AuthGuard], // Protege la ruta con AuthGuard
  },
  {
    path: 'perfil',
    loadChildren: () =>
      import('./pages/perfil/perfil.module').then((m) => m.PerfilPageModule),
    canActivate: [AuthGuard], // Protege la ruta con AuthGuard
  },
  {
    path: 'recuperar',
    loadChildren: () =>
      import('./pages/recuperar/recuperar.module').then((m) => m.RecuperarPageModule),
  },
  {
    path: 'conductor',
    loadChildren: () =>
      import('./pages/conductor/conductor.module').then((m) => m.ConductorPageModule),
    canActivate: [AuthGuard], // Opcional si quieres proteger esta ruta
  },
  {
    path: 'pasajero',
    loadChildren: () =>
      import('./pages/pasajero/pasajero.module').then((m) => m.PasajeroPageModule),
    canActivate: [AuthGuard], // Opcional si quieres proteger esta ruta
  },
  {
    path: 'conductor',
    loadChildren: () => import('./pages/conductor/conductor.module').then( m => m.ConductorPageModule)
  },
  {
    path: 'pasajero',
    loadChildren: () => import('./pages/pasajero/pasajero.module').then( m => m.PasajeroPageModule)
  },
  {
    path: 'viajes',
    loadChildren: () => import('./pages/viajes/viajes.module').then( m => m.ViajesPageModule)
  },
  {
    path: 'viaje-actual',
    loadChildren: () => import('./pages/viaje-actual/viaje-actual.module').then( m => m.ViajeActualPageModule)
  },

  { path: '', redirectTo: 'viajes', pathMatch: 'full' },
  { 
    path: 'viajes', 
    loadChildren: () => import('./pages/viajes/viajes.module').then(m => m.ViajesPageModule) 
  },
  { 
    path: 'viaje-actual', 
    loadChildren: () => import('./pages/viaje-actual/viaje-actual.module').then(m => m.ViajeActualPageModule) 
  },
];

  

@NgModule({
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
