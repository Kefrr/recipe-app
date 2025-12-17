import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MealdbService, Meal, Category } from '../services/mealdb.service'; // Додали Category

import { addIcons } from 'ionicons';
import { heart, restaurant, globe, search } from 'ionicons/icons';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, RouterModule],
})
export class HomePage implements OnInit {
  meals: Meal[] = [];
  categories: Category[] = []; // Список категорій
  activeCategory: string = ''; // Яка категорія зараз вибрана
  searchTerm: string = '';

  constructor(private mealService: MealdbService) {
    addIcons({ heart, restaurant, globe, search });
  }

  ngOnInit() {
    this.loadCategories(); // Спочатку вантажимо категорії
    this.searchMeals('');  // Потім популярні страви
  }

  // Завантаження списку категорій
  loadCategories() {
    this.mealService.getCategories().subscribe((res: any) => {
      this.categories = res.categories || [];
    });
  }

  // Вибір категорії (клік по кнопці)
  selectCategory(catName: string) {
    // Якщо клікнули на ту ж саму категорію — знімаємо виділення
    if (this.activeCategory === catName) {
      this.activeCategory = '';
      this.searchMeals(''); // Повертаємо звичайний список
      return;
    }

    this.activeCategory = catName;
    this.searchTerm = ''; // Очищаємо пошук текстом

    // Завантажуємо страви цієї категорії
    this.mealService.getMealsByCategory(catName).subscribe((res: any) => {
      this.meals = res.meals || [];
    });
  }

  // Звичайний пошук
  searchMeals(query: string) {
    this.activeCategory = ''; // Знімаємо виділення категорії, бо користувач шукає руками
    this.mealService.searchMeals(query).subscribe((response: any) => {
      this.meals = response.meals || [];
    });
  }

  onSearchChange(event: any) {
    const query = event.detail.value;
    if (query && query.length > 0) {
      this.searchMeals(query);
    }
  }
}