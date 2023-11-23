import { getProductById } from '../../services/Catalog.js';
import { loadCSS } from '../../utils.js';
export default class DetailsPage extends HTMLElement {
    constructor() {
        super();
        this.root = this.attachShadow({ mode: 'open' });
        this.product = {};
        const styles = document.createElement('style');
        this.root.appendChild(styles);
        loadCSS(styles, 'src/components/catalog-page/details-page.css');
    }
    connectedCallback() {
        const template = document.getElementById('details-page-template');
        this.root.appendChild(template.content.cloneNode(true));
        this.render();
    }
    async render() {
        if (this.dataset.id) {
            this.product = (await getProductById(this.dataset.id));
            this.root.querySelector('h2').textContent = this.product.name;
            this.root.querySelector('img').src = `/src/images/products/${this.product.image}`;
            this.root.querySelector('.description').textContent =
                this.product.description;
            this.root.querySelector('.price').textContent = `$ ${this.product.price.toFixed(2)} each`;
            this.root.querySelector('button').addEventListener('click', () => {
                // TODO addToCart(this.product.id);
                window.app.router.go('/#/order');
            });
        }
        else {
            alert('Invalid product ID');
        }
    }
}
customElements.define('details-page', DetailsPage);
