import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'translateCat',
  standalone: true // Важливо для нових версій Angular
})
export class TranslateCatPipe implements PipeTransform {

  // Словник перекладу
  private dictionary: { [key: string]: string } = {
    // Категорії
    'Beef': 'Яловичина',
    'Chicken': 'Курка',
    'Dessert': 'Десерт',
    'Lamb': 'Ягня',
    'Miscellaneous': 'Різне',
    'Pasta': 'Паста',
    'Pork': 'Свинина',
    'Seafood': 'Морепродукти',
    'Side': 'Гарнір',
    'Starter': 'Закуска',
    'Vegan': 'Веганське',
    'Vegetarian': 'Вегетаріанське',
    'Breakfast': 'Сніданок',
    'Goat': 'Козлятина',
    
    // Країни
    'American': 'Америка',
    'British': 'Британія',
    'Canadian': 'Канада',
    'Chinese': 'Китай',
    'Croatian': 'Хорватія',
    'Dutch': 'Нідерланди',
    'Egyptian': 'Єгипет',
    'French': 'Франція',
    'Greek': 'Греція',
    'Indian': 'Індія',
    'Irish': 'Ірландія',
    'Italian': 'Італія',
    'Jamaican': 'Ямайка',
    'Japanese': 'Японія',
    'Kenyan': 'Кенія',
    'Malaysian': 'Малайзія',
    'Mexican': 'Мексика',
    'Moroccan': 'Марокко',
    'Polish': 'Польща',
    'Portuguese': 'Португалія',
    'Russian': '...',
    'Spanish': 'Іспанія',
    'Thai': 'Таїланд',
    'Tunisian': 'Туніс',
    'Turkish': 'Туреччина',
    'Unknown': 'Невідомо',
    'Vietnamese': 'В\'єтнам',
    'Ukrainian': 'Україна'
  };

  transform(value: string): string {
    // Якщо слово є в словнику — повертаємо переклад, якщо ні — оригінал
    return this.dictionary[value] || value;
  }
}