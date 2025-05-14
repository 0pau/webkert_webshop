import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes), provideFirebaseApp(() => initializeApp({ projectId: "volt-vault-8add5", appId: "1:384515329726:web:02a1354cd95a18f41398ef", storageBucket: "volt-vault-8add5.firebasestorage.app", apiKey: "AIzaSyDsobl5iJ1X_FCRNNI1LZYKX9UJAG73tA4", authDomain: "volt-vault-8add5.firebaseapp.com", messagingSenderId: "384515329726", measurementId: "G-EYRWPRVJPL" })), provideAuth(() => getAuth()), provideFirestore(() => getFirestore())]
};
