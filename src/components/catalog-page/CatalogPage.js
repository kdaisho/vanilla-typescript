import { loadCSS } from '../../utils.js';
export default class CatalogPage extends HTMLElement {
    constructor() {
        super();
        this.root = this.attachShadow({ mode: 'open' });
        const style = document.createElement('style');
        this.root.appendChild(style);
        loadCSS(style, 'src/components/catalog-page/catalog-page.css');
    }
    connectedCallback() {
        const template = document.getElementById('catalog-page-template');
        this.root.appendChild(template.content.cloneNode(true));
        window.addEventListener('catalogupdate', () => {
            this.render();
        });
        this.render();
    }
    render() {
        const catalogUlElement = this.root.querySelector('#catalog');
        catalogUlElement.innerHTML = '';
        if (window.app.store.catalog) {
            for (const category of window.app.store.catalog) {
                const li = document.createElement('li');
                li.setAttribute('class', 'category');
                li.innerHTML = `
                    <h3>${category.name}</h3>       
                    <ul class='category-items'></ul>
                `;
                catalogUlElement.appendChild(li);
                category.products.forEach(product => {
                    const item = document.createElement('product-item');
                    item.dataset.product = JSON.stringify(product);
                    li.querySelector('.category-items').appendChild(item);
                });
            }
        }
        else {
            catalogUlElement.innerHTML = 'Loading...';
        }
    }
}
customElements.define('catalog-page', CatalogPage);
