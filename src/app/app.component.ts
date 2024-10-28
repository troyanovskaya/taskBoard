import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';
// import { EnvironmentInjector } from '@angular/core';
// import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
// import { getDatabase, provideDatabase } from '@angular/fire/database';
// import { environment } from './environment';
// import { firebaseProviders } from './firebase.providers';
// import { AngularFireAuthModule } from '@angular/fire/auth';
// import { AngularFirestoreModule } from '@angular/fire/firestore';
// import { AngularFireModule } from '@angular/fire';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, FooterComponent,
    // AngularFireModule.initializeApp(environment.firebaseConfig),
    // AngularFireAuthModule,  // for Authentication
    // AngularFirestoreModule, 
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  providers: [{ provide: LocationStrategy, useClass: HashLocationStrategy,  
   }]
})
export class AppComponent {
  title = 'taskBoard';


}
