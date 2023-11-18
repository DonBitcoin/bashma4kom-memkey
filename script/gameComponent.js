function shuffle(array) {
  var top = array.length;

  while(--top > 0) // while (top -= 1 > 0)
  {
    // current = floor[<0..100%> * (array.length + 1)]
    var current = Math.floor(Math.random() * (top + 1));
    var temporary = array[current];

    array[current] = array[top];
    array[top] = temporary;
  }
  
  return array;
}

const text = shuffle(["ТРАКТОР", "КНИГА", "УЛИЦА", "ФОНАРЬ"]);

// MAIN LOOP
window.onload = (event) => {

  const separator = 
  ((iterator) => {
    return function next(array) {
      if (iterator >= array.length) //Если весь список изчерпан:
      {
        array = shuffle(array); //перемешиваем список слов...
        iterator = 0; //и считываем его заново.
      }
      return array[iterator++]; // Возвращаем следующее слово.  
    }
  }) (0);
  var word = separator(text);


  const tokenizer = 
  ((iterator) => {
    let current = "";
    return function next(string) {
      if (current != string) //Если текущее слово поменялось:
      {
        current = string; //заменяем печатываемое слово...
        iterator = 0; //и считываем его сначала.
      } 
      return string[iterator++]; // Возвращаем следующую букву слова.
    }
  }) (0);
  var token = tokenizer(word);

  const area = document.getElementById("reference-text");
  area.value = word + '\t';

  window.onkeydown = (event) => {
    check(token, event.key);
  }

  function check(expected, inputed) {
    if (expected === undefined)
    {
      word = separator(text);
      token = tokenizer(word);
      area.value += '\n' + word + '\t';
    }
    if (inputed === expected)
    {
      area.value = area.value + token;
      token = tokenizer(word);
    }
    //Добавить функциональность по типу:
    // * Сравниваем текущую букву с введённой
    // * Если есть какие-то ошибки ->
    // ** Останавливаем набор символов,
    // ** указываем на ошибку...
    // * Если ошибок нет | ошибка была исправлена ->
    // ** продолжаем итеррацию...
  }
}
