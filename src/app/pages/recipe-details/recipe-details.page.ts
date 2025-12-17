import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, ToastController } from '@ionic/angular';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { MealdbService } from '../../services/mealdb.service';
import { Preferences } from '@capacitor/preferences';

// 1. Імпортуємо всі необхідні іконки (включаючи нові для дизайну)
import { addIcons } from 'ionicons';
import { 
  heart, 
  heartOutline, 
  restaurant, 
  globe, 
  logoYoutube, 
  arrowBack, 
  ellipse,       // <--- Для булітів списку
  cartOutline,   // <--- Для заголовка інгредієнтів
  receiptOutline // <--- Для заголовка інструкції
} from 'ionicons/icons';

@Component({
  selector: 'app-recipe-details',
  templateUrl: './recipe-details.page.html',
  styleUrls: ['./recipe-details.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, RouterModule]
})
export class RecipeDetailsPage implements OnInit {
  meal: any = null;
  ingredients: any[] = [];
  isFavorite: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private mealService: MealdbService,
    private toastController: ToastController
  ) {
    // 2. Реєструємо іконки, щоб HTML міг їх використовувати
    addIcons({ 
      heart, 
      heartOutline, 
      restaurant, 
      globe, 
      logoYoutube, 
      arrowBack, 
      ellipse, 
      cartOutline, 
      receiptOutline 
    });
  }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.mealService.getMealById(id).subscribe((response) => {
        if (response.meals && response.meals.length > 0) {
          this.meal = response.meals[0];
          this.extractIngredients();
          this.checkIfFavorite();
        }
      });
    }
  }

  // Перетворюємо дані API на зручний список
  extractIngredients() {
    this.ingredients = [];
    for (let i = 1; i <= 20; i++) {
      const ingredient = this.meal['strIngredient' + i];
      const measure = this.meal['strMeasure' + i];
      
      // Додаємо, тільки якщо інгредієнт не пустий
      if (ingredient && ingredient.trim() !== '') {
        this.ingredients.push({ name: ingredient, measure: measure });
      }
    }
  }

  // Перевіряємо, чи є рецепт в пам'яті телефону
  async checkIfFavorite() {
    const { value } = await Preferences.get({ key: 'favorites' });
    let favorites = value ? JSON.parse(value) : [];
    this.isFavorite = favorites.some((fav: any) => fav.idMeal === this.meal.idMeal);
  }

  // Додаємо або видаляємо з обраного
  async toggleFavorite() {
    const { value } = await Preferences.get({ key: 'favorites' });
    let favorites = value ? JSON.parse(value) : [];

    if (this.isFavorite) {
      // Видаляємо
      favorites = favorites.filter((fav: any) => fav.idMeal !== this.meal.idMeal);
      this.isFavorite = false;
      this.showToast('Removed from favorites ❌');
    } else {
      // Додаємо
      favorites.push(this.meal);
      this.isFavorite = true;
      this.showToast('Added to favorites ❤️');
    }

    // Зберігаємо оновлений масив
    await Preferences.set({
      key: 'favorites',
      value: JSON.stringify(favorites),
    });
  }

  // Повідомлення знизу екрану
  async showToast(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000,
      position: 'bottom',
      color: 'dark',
      cssClass: 'custom-toast' // Можна додати стилі, якщо треба
    });
    toast.present();
  }
}