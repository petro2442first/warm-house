// Menu Item
export class MenuItem {
    constructor(title, link = '#') {
        this.title = title;
        this.link = link;
    }
}
// Default Menu
export class Menu {
    constructor(containerClass, items) {
        this.containerClass = containerClass;
        this.container = document.createElement('div');
        this.container.classList.add(this.containerClass);
        this.items = items;
    }
    init() {
        this.items.forEach(item => {
            const target = document.querySelector(item.link);
            const link = document.querySelector(`a[href="${item.link}"]`);
            link.addEventListener('click', goToBlock);
        });

        function goToBlock(event) {
            event.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            target.scrollIntoView({
                block: 'start',
                behavior: 'smooth'
            });
        }
    }
    render() {
        const HTML = `
        <nav class="${ this.containerClass }__container">
            <ul class="${ this.containerClass }__menu" id="header-menu">
                ${ this.itemsToHTML() }
            </ul>
        </nav>
        `;
        this.container.innerHTML = HTML;
        return this.container;
    }
    itemsToHTML() {
        let HTML = '';
        const createItem = (title, link) => {
            return `
        <li class="${ this.containerClass }__item">
          <a href="${ link }">${ title }</a>
        </li>
        `;
        }
        this.items.forEach(item => {
            HTML += createItem(item.title, item.link);
        });
        return HTML;
    }
}

// Mobile Menu
export class MobileMenu extends Menu {
    constructor(containerClass, items) {
        super(containerClass, items);
        this.hamburger = document.createElement('div');
        this.hamburger.id = "hamburger";
        this.hamburger.innerHTML = `
        <div class="line"></div>
        `;
    }
    init() {
        super.init();
        this.hamburger.addEventListener('click', () => {
            this.container.classList.toggle('show');
        })
    }
    render() {
        this.container = super.render();
        const nav = this.container.children[0];
        nav.prepend(this.hamburger);
        return this.container;
    }
}