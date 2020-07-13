// TODO: function for smooth appeearance of site blocks
// TODO: PopUp calculator fro header

import 'normalize.css'
import '../style/style.scss'
import Swiper from 'swiper'
import { Menu, MenuItem, MobileMenu } from './Menu'


function smoothAppearance() {
    const header = document.querySelector('#header');

}

function navMenu() {
    const items = [
        new MenuItem('О нас', '#about-us'),
        new MenuItem('Почему мы?', '#why-we'),
        new MenuItem('Как мы работаем?', '#how-we-work'),
        new MenuItem('Галерея', '#gallery'),
        new MenuItem('Связатсья с нами', '#contacts'),
    ]
    const menu =
        (screen.width <= 768) ?
        new MobileMenu('mobile-nav-bar', items) :
        new Menu('nav-bar', items);
    document.querySelector('.header__container').prepend(menu.render());
    menu.init();
    window.addEventListener('resize', () => {
        const menu =
            (screen.width <= 768) ?
            new MobileMenu('mobile-nav-bar', items) :
            new Menu('nav-bar', items);
        const navBar = document.querySelector('.nav-bar') || document.querySelector('.mobile-nav-bar');
        navBar.remove();
        document.querySelector('.header__container').prepend(menu.render());
        menu.init();
    });
}

function gallery() {
    const gallery = document.querySelector('.gallery__container');
    const viewer = document.querySelector('#gallery-viewer');
    const slider = new Swiper(viewer.querySelector('.gallery-viewer__picture-wrapper'), {
        direction: 'horizontal',
        loop: true,
        spaceBetween: 0,
        effect: 'slide',
        speed: 500,
        autoHeight: true,
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        pagination: {
            el: '.swiper-pagination',
            type: 'fraction',
        },
    });
    const slide = src => `
    <div class="gallery-viewer__slide swiper-slide">
      <img src="${src}" alt="">
    </div>
    `;
    const items = document.querySelectorAll('.gallery__image');
    items.forEach(item => {
        item.addEventListener('click', openGalleryViewer.bind(item, event, items));
    });

    function openGalleryViewer(event, items) {
        let selector = document.getElementById('gallery-viewer');
        const viewer = selector.querySelector('.gallery-viewer__picture-wrapper').swiper;
        selector.classList.add('show');
        let counter = 0;
        let index;
        items.forEach(item => {
            if (item === this) {
                index = counter;
            }
            counter++;
        });
        viewer.slideToLoop(index, 0);
        viewer.update();
    }
    items.forEach(item => {
        const img = item.querySelector('img');
        slider.appendSlide(slide(img.src));
    });
    slider.update();
    Array.from(slider.slides).forEach(slide => {
        slide.addEventListener('click', () => {
            viewer.classList.remove('show');
            document.documentElement.style.overflowY = 'auto';
        });
    });
    const closeViewer = document.querySelector('#viewer-close');
    closeViewer.addEventListener('click', () => {
        viewer.classList.remove('show');
        document.documentElement.style.overflowY = 'auto';
    });
    gallery.addEventListener('click', event => {
        if (event.target.src !== undefined) {
            viewer.classList.add('show');
            document.documentElement.style.overflowY = 'hidden';
        }
    })
}

function scrollEvents() {
    const navBar = document.querySelector('.nav-bar') || null;
    if (navBar !== null) {
        if (window.scrollY > 0) {
            navBar.classList.add('scroll');
        } else {
            navBar.classList.remove('scroll');
        }
    }

    document.addEventListener('scroll', () => {

        const goTop = document.getElementById('go-top');
        if (window.scrollY > window.innerHeight) {
            goTop.classList.add('show');
        } else {
            goTop.classList.remove('show');
        }
        const navBar = document.querySelector('.nav-bar') || null;
        if (navBar == null) return;
        if (window.scrollY > 0) {
            navBar.classList.add('scroll');
        } else {
            navBar.classList.remove('scroll');
        }
    });
    const goTop = document.getElementById('go-top');
    goTop.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: 'smooth'
        });
    });
}

function contactForm() {
    const groups = document.querySelectorAll('.contact-form__group') || null;
    if (groups === null) return false;
    groups.forEach(group => {
        const label = group.children[0];
        const input = group.children[1];
        input.addEventListener('focus', focus.bind(input, event, label));
        input.addEventListener('focusout', blur.bind(input, event, label));
    });

    function focus(event, label) {
        label.classList.add('focus');
    }

    function blur(event, label) {
        if (this.value === '') label.classList.remove('focus');

    }

    const form = document.querySelector('.contact-form') || null;
    if(form === null) return;
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const subject = form.querySelector('input[name="subject"]').value;
        const name = form.querySelector('input[name="name"]').value;
        const phone = form.querySelector('input[name="phone"]').value;
        fetch('../php/send.php', {
            method: 'POST',
            body: JSON.stringify([subject, name, phone]),
        })
        .then(response => response.text())
        .then(data => {
            const answer = document.querySelector('.contact-form__response');
            answer.innerHTML = data;
            setTimeout(() => {
                answer.classList.remove('show');
                answer.classList.remove('ok');
            }, 2500);
            answer.classList.add('show');
            answer.classList.add('ok');
        })
        .then(error => {
            console.log(error);
        })
    });
}

function backCall() {
    const callBtn = document.querySelector('.call');
    const callWindow = document.querySelector('#back-call');
    callBtn.addEventListener('click', () => {
        callWindow.classList.add('show');
        document.documentElement.style.overflowY = 'hidden';
    });
    const closeCallWindow = document.querySelector('#close-call-window');
    closeCallWindow.addEventListener('click', () => {
        callWindow.classList.remove('show');
        document.documentElement.style.overflowY = 'auto';
    });
    const form = document.querySelector('.back-call__form') || null;
    if(form === null) return;
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const subject = form.querySelector('input[name="subject"]').value;
        const phone = form.querySelector('input[name="phone"]').value;
        const name = '';
        fetch('../php/send.php', {
            method: 'POST',
            body: JSON.stringify([subject, name, phone]),
        })
        .then(response => response.text())
        .then(data => {
            const answer = document.querySelector('.back-call__response');
            answer.innerHTML = data;
            setTimeout(() => {
                answer.classList.remove('show');
                answer.classList.remove('ok');
            }, 2500);
            answer.classList.add('show');
            answer.classList.add('ok');
        })
        .then(error => {
            console.log(error);
        })
    });
}

function calculator() {
    const openCalculator = document.querySelector('#checkout') || null;
    // const calcWindow = document.querySelector('#calculator');
    // calcBtn.addEventListener('click', () => {
    //     calcWindow.classList.add('show');
    //     document.documentElement.style.overflowY = 'hidden';
    // });
    // const closeCalcWindow = document.querySelector('#close-calculator');
    // closeCalcWindow.addEventListener('click', () => {
    //     calcWindow.classList.remove('show');
    //     document.documentElement.style.overflowY = 'auto';
    // });
    const calcBtn = document.querySelector('#calculate');
    calcBtn.addEventListener('click', calculate);

    function calculate() {
        const price = 750;
        const coef = 1.3;
        const height = document.querySelector('#height').value || '';
        const length = document.querySelector('#length').value || '';
        const depth = document.querySelector('#depth').value || '';

        const container = document.querySelector('.response');
        if (height === '' || length === '' || depth === '') {
            const responseHTML = `
            <div class="error-msg">Заполните все поля!</div>
            `;
            container.innerHTML = responseHTML;
            container.classList.add('show');
        } else {
            const answerVolume = (height * length * depth).toFixed(2);
            const answerPrice = (answerVolume * price * coef).toFixed(2);
            const responseHTML = `
            <div class="desktop-calculator__group desktop-calculator__group--reverse">
                <label for="answer">м<sup>3</sup></label>
                <input type="number" name="answer-volume" id="answer-volume" readonly value="${answerVolume}">
            </div>
            <div class="desktop-calculator__group desktop-calculator__group--reverse">
                <label for="answer">грн</label>
                <input type="number" name="answer-price" id="answer-price" readonly value="${answerPrice}">
            </div>
            <button class="call-btn">Запросить обратный звонок для получения скидки</button>
            `;
            container.innerHTML = responseHTML;
            document.querySelector('.call-btn').addEventListener('click', () => {
                const callWindow = document.querySelector('#back-call');
                callWindow.classList.add('show');
                document.documentElement.style.overflowY = 'hidden';
            });
            container.classList.add('show');
        }

    }
}


document.addEventListener('DOMContentLoaded', () => {

    smoothAppearance();
    navMenu();
    gallery();
    scrollEvents();
    contactForm();
    backCall();
    calculator();
});