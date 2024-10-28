import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getDatabase, provideDatabase } from '@angular/fire/database';
import { environment } from '../app/environment';

export const firebaseProviders = [
  provideFirebaseApp(() => initializeApp(environment.firebaseConfig)),
  provideDatabase(() => getDatabase())
];