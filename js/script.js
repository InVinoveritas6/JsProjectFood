window.addEventListener('DOMContentLoaded', () => {
   //Tabs
   const tabs = document.querySelectorAll('.tabheader__item'),
      tabContent = document.querySelectorAll('.tabcontent'),
      tabsParent = document.querySelector(".tabheader__items");

   function hideTabContent() {
      tabContent.forEach(item => {
         item.classList.add('hide');
         item.classList.remove('show');
      });
      tabs.forEach(item => {
         item.classList.remove('tabheader__item_active');
      });
   }

   function showTabContent(i = 0) {
      tabContent[i].classList.add('show', 'fade');
      tabContent[i].classList.remove('hide');
      tabs[i].classList.add('tabheader__item_active');
   }

   hideTabContent();
   showTabContent();

   tabsParent.addEventListener('click', (event) => {
      const target = event.target;

      if (target && target.classList.contains('tabheader__item')) {
         tabs.forEach((item, i) => {
            if (target == item) {
               hideTabContent();
               showTabContent(i);
            }
         });
      }
   });

   //Timer

   const deadLine = '2021-08-11';

   function getTimeRemening(endtime) {
      const t = Date.parse(endtime) - Date.parse(new Date()),
         days = Math.floor(t / (1000 * 60 * 60 * 24)),
         hours = Math.floor((t / (1000 * 60 * 60)) % 24),
         minutes = Math.floor((t / (1000 * 60)) % 60),
         seconds = Math.floor((t / 1000) % 60);
      return {
         'total': t,
         'days': days,
         'hours': hours,
         'minutes': minutes,
         'seconds': seconds
      };
   }

   function getZiro(num) {
      if (num >= 0 && num < 10) {
         return `0${num}`;
      } else {
         return num;
      }
   }

   function setClock(selector, endtime) {
      const timer = document.querySelector(selector),
         days = timer.querySelector('#days'),
         hours = timer.querySelector('#hours'),
         minutes = timer.querySelector('#minutes'),
         seconds = timer.querySelector('#seconds'),
         timeInterval = setInterval(updateclock, 1000);

      updateclock();

      function updateclock() {
         const t = getTimeRemening(endtime);

         days.innerHTML = getZiro(t.days);
         hours.innerHTML = getZiro(t.hours);
         minutes.innerHTML = getZiro(t.minutes);
         seconds.innerHTML = getZiro(t.seconds);

         if (t.total <= 0) {
            clearInterval(timeInterval);
         }
      }
   }

   setClock('.timer', deadLine);


   //Modal

   const modalTrigger = document.querySelectorAll('[data-modal]'),
      modal = document.querySelector('.modal'),
      modalCloseBtn = document.querySelector('[data-close]');

   function openModal() {
      modal.classList.add('show');
      modal.classList.remove('hide');
      document.body.style.overflow = 'hidden';
      clearInterval(modalTimerId);
   }

   modalTrigger.forEach(btn =>
      btn.addEventListener('click', openModal)
   );

   function closeModal() {
      modal.classList.add('hide');
      modal.classList.remove('show');
      document.body.style.overflow = '';
   }

   modalCloseBtn.addEventListener('click', closeModal());

   modal.addEventListener('click', (e) => {
      if (e.target === modal) {
         closeModal();
      }
   });

   document.addEventListener('keydown', (e) => {
      if (e.code === "Escape" && modal.classList == 'modal show') {
         closeModal();
      }
   });
   // const modalTimerId = setTimeout(openModal, 5000);

   function showModalByScroll() {
      if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
         openModal();
         window.removeEventListener('scroll', showModalByScroll);
      }
   }
   window.addEventListener('scroll', showModalByScroll);

   // Классы для карточек

   class MenuCard {
      constructor(src, alt, title, descr, price, parentSelector) {
         this.src = src;
         this.alt = alt;
         this.title = title;
         this.descr = descr;
         this.price = price;
         this.parent = document.querySelector(parentSelector);
         this.transfer = 27;
         this.changeToUAH();
      }

      changeToUAH() {
         this.price = this.price * this.transfer;
      }

      render() {
         const element = document.createElement('div');
         element.innerHTML = `
         <div class="menu__item">
                    <img src=${this.src} alt=${this.alt}>
                    <h3 class="menu__item-subtitle">${this.title}</h3>
                    <div class="menu__item-descr">${this.descr}</div>
                    <div class="menu__item-divider"></div>
                    <div class="menu__item-price">
                        <div class="menu__item-cost">Цена:</div>
                        <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
                    </div>
                </div>
         `;
         this.parent.append(element);
      }
   }
   new MenuCard(
      "img/tabs/vegy.jpg",
      "vegy",
      'Меню "Фитнес"',
      'Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!',
      9,
      '.menu .container'
   ).render();
   new MenuCard(
      "img/tabs/elite.jpg",
      "elite",
      'Меню “Премиум”',
      'В меню “Премиум” мы используем не только красивый дизайн упаковки, но и качественное исполнение блюд. Красная рыба, морепродукты, фрукты - ресторанное меню без похода в ресторан!',
      9,
      '.menu .container'
   ).render();
   new MenuCard(
      "img/tabs/post.jpg",
      "post",
      'Меню "Постное"',
      'Меню “Постное” - это тщательный подбор ингредиентов: полное отсутствие продуктов животного происхождения, молоко из миндаля, овса, кокоса или гречки, правильное количество белков за счет тофу и импортных вегетарианских стейков.',
      9,
      '.menu .container'
   ).render();
});