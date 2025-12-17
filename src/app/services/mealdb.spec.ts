import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing'; // <--- Важливо для тестів з API
import { MealdbService } from './mealdb.service';

describe('MealdbService', () => {
  let service: MealdbService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule], // Додаємо модуль тестування HTTP
      providers: [MealdbService]
    });
    service = TestBed.inject(MealdbService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});