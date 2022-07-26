/* Задания на урок:

1) Реализовать функционал, что после заполнения формы и нажатия кнопки "Подтвердить" -
новый фильм добавляется в список. Страница не должна перезагружаться.
Новый фильм должен добавляться в movieDB.movies.
Для получения доступа к значению input - обращаемся к нему как input.value;
P.S. Здесь есть несколько вариантов решения задачи, принимается любой, но рабочий.

2) Если название фильма больше, чем 21 символ - обрезать его и добавить три точки

3) При клике на мусорную корзину - элемент будет удаляться из списка (сложно)

4) Если в форме стоит галочка "Сделать любимым" - в консоль вывести сообщение:
"Добавляем любимый фильм"

5) Фильмы должны быть отсортированы по алфавиту */

'use strict';

document.addEventListener('DOMContentLoaded', () => {

  const movieDB = {
    movies: [
      'Логан',
      'Лига справедливости',
      'Ла-ла лэнд',
      'Одержимость',
      'Скотт Пилигрим против...'
    ]
  };

  const promo = document.querySelectorAll('.promo__adv img');
  const bg = document.querySelectorAll('.promo__bg')[0];
  const gnr = bg.querySelectorAll('.promo__genre')[0];
  const filmList = document.querySelector('.promo__interactive-list');
  const promoInteractive = document.querySelector('.add');
  const input = promoInteractive.querySelector('.adding__input');
  const confim = promoInteractive.querySelector('button');
  const check = promoInteractive.querySelector('[type="checkbox"]');




  promo.forEach(item => {
    item.remove();
  });

  gnr.textContent = 'ДРАМА';
  bg.style.backgroundImage = 'url("img/bg.jpg")';

  let pushNewFilmList = function (films, parent) {
    parent.innerHTML = '';
    films.forEach((film, i) => {
      parent.innerHTML += `<li class="promo__interactive-item">${i + 1})${film}
        <div class="delete"></div></li>`;
    });
    delFilms();

  };


  confim.addEventListener('click', (e) => {
    e.preventDefault();
    let newFilm = input.value;
    if (newFilm !== '') {
      if (newFilm.length > 21) {
        newFilm = newFilm.slice(0, 21);
        newFilm = newFilm + '...';
      }
      console.log(newFilm);
      let favorites = check.checked;
      movieDB.movies.push(newFilm);
      movieDB.movies.sort();
      pushNewFilmList(movieDB.movies, filmList);
      if (favorites === true) {
        console.log('Добавляем любимый фильм');
      }
      check.checked = false;
      input.value = '';
    }
  });
  function delFilms() {
    const deleteFilms = document.querySelectorAll('.delete');
    deleteFilms.forEach((item, i) => {
      item.addEventListener('click', (e) => {
        e.preventDefault();
        movieDB.movies.splice(i, 1);
        pushNewFilmList(movieDB.movies, filmList);
        movieDB.movies.sort();
        console.log(movieDB.movies);
      });
    });
  }
  delFilms();

});
// console.log(promoInteractive);
// console.log(check);
// Возьмите свой код из предыдущей практики