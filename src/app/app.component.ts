import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-root', 
  template: `
    <ion-app>
      <ion-router-outlet></ion-router-outlet> <!-- where pages gonna load -->
    </ion-app>
  `,
  standalone: true, // means it don't need a module
  imports: [CommonModule, RouterModule, IonicModule] // imports we need for this to work
})
export class AppComponent {} 
