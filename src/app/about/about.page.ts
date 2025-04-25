import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-about', // comp selector
  templateUrl: './about.page.html', // html file
  styleUrls: ['./about.page.scss'], // styles
  standalone: true,
  imports: [CommonModule, FormsModule, IonicModule] // basics needed
})
export class AboutPage {
  constructor(private router: Router) {} 

  goBack() {
    this.router.navigate(['/home']); // back to home
  }
}
