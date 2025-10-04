// src/app/app.config.ts
import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideIonicAngular } from '@ionic/angular/standalone';
import { routes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';
import { addIcons } from 'ionicons';
import { 
  // Íconos para Clientes
  addOutline, 
  logOutOutline, 
  personCircleOutline, 
  trashOutline,
  closeOutline,
  arrowBackOutline,
  peopleOutline,
  createOutline,
  
  // Íconos para Login/Register
  personAddOutline,
  warningOutline,
  checkmarkCircleOutline,
  
  // Íconos generales
  homeOutline,
  cubeOutline,

  mailOutline,
  callOutline,
  locationOutline,
  personOutline,
  checkmarkOutline,
  refreshOutline
} from 'ionicons/icons';

// Registrar TODOS los íconos que vamos a usar en la aplicación
addIcons({
  // Clientes
  'add-outline': addOutline,
  'log-out-outline': logOutOutline,
  'person-circle-outline': personCircleOutline,
  'trash-outline': trashOutline,
  'close-outline': closeOutline,
  'arrow-back-outline': arrowBackOutline,
  'people-outline': peopleOutline,
  'create-outline': createOutline,
  
  // Auth
  'person-add-outline': personAddOutline,
  'warning-outline': warningOutline,
  'checkmark-circle-outline': checkmarkCircleOutline,
  
  // General
  'home-outline': homeOutline,
  'cube-outline': cubeOutline,

  'mail-outline': mailOutline,
  'call-outline': callOutline,
  'location-outline': locationOutline,
  'person-outline': personOutline,
  'checkmark-outline': checkmarkOutline,
  'refresh-outline': refreshOutline
});

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideIonicAngular({}),
    provideHttpClient()
  ]
}; 