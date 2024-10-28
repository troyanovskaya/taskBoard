import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { environment } from './environment';

import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { getDatabase, provideDatabase } from '@angular/fire/database';

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes), 
    provideAnimationsAsync(),
    provideDatabase(() => getDatabase()),
    provideHttpClient(withFetch()), provideFirebaseApp(() => initializeApp({"projectId":"taskboard-eb7da","appId":"1:354177238938:web:d0c3f172c0e4083d1edc23","databaseURL":"https://taskboard-eb7da-default-rtdb.firebaseio.com","storageBucket":"taskboard-eb7da.appspot.com","apiKey":"AIzaSyAM82XcacqdPNT5p4AGJ8rm7yQA5wnfIJA","authDomain":"taskboard-eb7da.firebaseapp.com","messagingSenderId":"354177238938","measurementId":"G-SW2E9JZEH1"})), provideAuth(() => getAuth()), provideFirestore(() => getFirestore())
  ]
};
