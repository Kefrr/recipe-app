import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { Preferences } from '@capacitor/preferences';

import { addIcons } from 'ionicons';
import { arrowBack, restaurant, globe } from 'ionicons/icons';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.page.html',
  styleUrls: ['./favorites.page.scss'],
  standalone: true,
  // Прибрали TranslateCatPipe
  imports: [IonicModule, CommonModule, FormsModule, RouterModule] 
})
export class FavoritesPage {
  favoriteMeals: any[] = [];

  constructor() {
    addIcons({ arrowBack, restaurant, globe });
  }

  ionViewWillEnter() {
    this.loadFavorites();
  }

  async loadFavorites() {
    const { value } = await Preferences.get({ key: 'favorites' });
    this.favoriteMeals = value ? JSON.parse(value) : [];
  }
}