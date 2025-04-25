import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Storage } from '@ionic/storage-angular';
import { Device } from '@capacitor/device';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home', 
  templateUrl: './home.page.html', // html file
  styleUrls: ['./home.page.scss'], // css file
  standalone: true,
  imports: [CommonModule, FormsModule, IonicModule] // imports needed 
})
export class HomePage implements OnInit {
  amount = 1; // how much money to convert
  fromCurrency = 'USD'; // default from
  toCurrency = 'EUR'; // default to
  result: number | null = null; // converted value
  currencies = ['USD', 'EUR', 'GBP', 'JPY', 'AUD']; // supported curr
  rates: any = {}; // gonna hold exchange rates
  deviceInfo: any = {}; 

  constructor(
    private http: HttpClient, // to call the api
    private storage: Storage, // for saving favorites
    private router: Router // to move between pages
  ) {}

  async ngOnInit() {
    await this.storage.create(); // setup storage
    this.loadRates(); // get the rates
    this.loadDeviceInfo(); // get device info
  }

  loadRates() {
    this.http.get('https://api.exchangerate-api.com/v4/latest/USD')
      .subscribe((data: any) => this.rates = data.rates); // set rates
  }

  async loadDeviceInfo() {
    this.deviceInfo = await Device.getInfo(); // gets info like model etc
  }

  async saveFavorites() {
    const existingFavorites = await this.storage.get('favorites') || []; // get old favs

    const newFavorite = {
      from: this.fromCurrency,
      to: this.toCurrency,
      timestamp: new Date().getTime() // for sorting maybe
    };

    const exists = existingFavorites.some((fav: any) => 
      fav.from === newFavorite.from && fav.to === newFavorite.to
    );

    if (!exists) {
      existingFavorites.unshift(newFavorite); // add to start
      const updatedFavorites = existingFavorites.slice(0, 5); // keep top 5
      await this.storage.set('favorites', updatedFavorites); // save them
    }
  }

  convert() {
    if (this.rates[this.fromCurrency] && this.rates[this.toCurrency]) {
      this.result = this.amount * (this.rates[this.toCurrency] / this.rates[this.fromCurrency]); // doin the math
    }
  }

  swapCurrencies() {
    [this.fromCurrency, this.toCurrency] = [this.toCurrency, this.fromCurrency]; // swap the values
    this.convert(); // convert again
  }

  navigateTo(page: string) {
    this.router.navigate([`/${page}`]); // go to other page
  }
}
