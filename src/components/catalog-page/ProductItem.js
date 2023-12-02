import { addToCart } from '../../services/Order.js';
export default class ProductItem extends HTMLElement {
    constructor() {
        super();
    }
    connectedCallback() {
        const template = document.getElementById('product-item-template');
        this.appendChild(template.content.cloneNode(true));
        const product = JSON.parse(this.dataset.product);
        delete this.dataset.product;
        this.querySelector('h4').textContent = product.name;
        this.querySelector('p.price').textContent =
            '$' + product.price.toFixed(2);
        this.querySelector('img').src = `src/images/products/${product.image}`;
        this.querySelector('a').addEventListener('click', async (event) => {
            event.preventDefault();
            const target = event.target;
            if (target.tagName.toLowerCase() === 'button') {
                await addToCart(product.id);
            }
            else {
                window.app.router.go(`/#/product/${product.id}`);
            }
        });
    }
}
customElements.define('product-item', ProductItem);
