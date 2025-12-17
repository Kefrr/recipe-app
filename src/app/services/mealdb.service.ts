import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Meal {
  idMeal: string;
  strMeal: string;
  strMealThumb: string;
  strCategory: string;
  strArea: string;
  strInstructions: string;
}

export interface Category {
  idCategory: string;
  strCategory: string;
  strCategoryThumb: string;
}

@Injectable({
  providedIn: 'root'
})
export class MealdbService {
  private apiUrl = 'https://www.themealdb.com/api/json/v1/1';

  constructor(private http: HttpClient) { }

  // 1. Пошук за назвою
  searchMeals(query: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/search.php?s=${query}`);
  }

  // 2. Деталі рецепту
  getMealById(id: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/lookup.php?i=${id}`);
  }

  // 3. Отримати список всіх категорій (з картинками)
  getCategories(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/categories.php`);
  }

  // 4. Отримати страви конкретної категорії
  getMealsByCategory(category: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/filter.php?c=${category}`);
  }
}