// importing stuff we need for app to work
import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { provideIonicAngular } from '@ionic/angular/standalone';
import { routes } from './app/app.routes';
import { AppComponent } from './app/app.component';
import { IonicStorageModule } from '@ionic/storage-angular';
import { importProvidersFrom } from '@angular/core';

// bootstrappin the app with main component n some providers
bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes), // set up the routes here
    provideHttpClient(), 
    provideIonicAngular({}), 
    importProvidersFrom(IonicStorageModule.forRoot()) // storage so data can be saved
  ]
}).catch(err => console.error(err)); 
