import { loadCSS } from '../../utils.js';
export default class OrderPage extends HTMLElement {
    constructor() {
        super();
        this.root = this.attachShadow({ mode: 'open' });
        const styles = document.createElement('style');
        this.root.appendChild(styles);
        const section = document.createElement('section');
        this.root.appendChild(section);
        this.root.appendChild(styles);
        loadCSS(styles, 'src/reset.css', 'src/components/common.css', 'src/components/order-page/order-page.css');
    }
    connectedCallback() {
        window.addEventListener('appcartchange', () => {
            this.render();
        });
        this.render();
    }
    render() {
        const section = this.root.querySelector('section');
        if (!section) {
            console.error('Section not found');
            return;
        }
        if (window.app.store.cart.length === 0) {
            section.innerHTML = `
                <p class="empty">Your order is empty</p>
            `;
        }
        else {
            const html = `
                <h2>Your Order</h2>
                <ul></ul>
                <footer></footer>
            `;
            section.innerHTML = html;
            const template = document.getElementById('order-form-template');
            const content = template.content.cloneNode(true);
            section.appendChild(content);
            const unorderedList = this.root.querySelector('ul');
            let total = 0;
            for (const prodInCart of window.app.store.cart) {
                const item = document.createElement('cart-item');
                item.dataset.item = JSON.stringify(prodInCart);
                unorderedList.appendChild(item);
                total += prodInCart.quantity * prodInCart.product.price;
            }
            const footer = this.root.querySelector('footer');
            footer.innerHTML += `
                <p class='total'>Total</p>
                <p class='price-total'>$${total.toFixed(2)}</p>
            `;
        }
    }
}
customElements.define('order-page', OrderPage);
