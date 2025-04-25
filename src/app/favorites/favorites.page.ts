import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-favorites', // selector thing
  templateUrl: './favorites.page.html', // html
  styleUrls: ['./favorites.page.scss'], // styles
  standalone: true,
  imports: [CommonModule, FormsModule, IonicModule] // needed stuff
})
export class FavoritesPage implements OnInit {
  favorites: any[] = []; // hold the favs

  constructor(
    private storage: Storage, // to get/save stuff
    private router: Router // to go back
  ) {}

  async ngOnInit() {
    this.loadFavorites(); // get favs on load
  }

  async loadFavorites() {
    this.favorites = await this.storage.get('favorites') || []; // load from storage
  }

  async clearFavorites() {
    await this.storage.remove('favorites'); // remove from storage
    this.favorites = []; // also clear from ui
  }

  async deleteFavorite(timestamp: number) {
    this.favorites = this.favorites.filter(fav => fav.timestamp !== timestamp); // filter out the one
    await this.storage.set('favorites', this.favorites); // update it
  }

  goBack() {
    this.router.navigate(['/home']); // back to home
  }
}
