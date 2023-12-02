import { loadCSS } from '../../utils.js'

export default class OrderPage extends HTMLElement {
    root: ShadowRoot

    constructor() {
        super()
        console.log('==>', 11)

        this.root = this.attachShadow({ mode: 'open' })
        const styles = document.createElement('style')
        this.root.appendChild(styles)
        const section = document.createElement('section')
        this.root.appendChild(section)
        this.root.appendChild(styles)

        loadCSS(styles, 'src/components/order-page/order-page.css')
    }

    connectedCallback() {
        window.addEventListener('appcartchange', () => {
            this.render()
        })
        this.render()
    }

    render() {
        const section = this.root.querySelector('section')

        if (!section) {
            console.error('Section not found')
            return
        }

        if (window.app.store.cart.length == 0) {
            section.innerHTML = `
                <p class="empty">Your order is empty</p>
            `
        } else {
            const html = `
                <h2>Your Order</h2>
                <ul></ul>
            `

            section.innerHTML = html

            const template = document.getElementById(
                'order-form-template'
            ) as HTMLTemplateElement

            const content = template.content.cloneNode(true)
            section.appendChild(content)

            const unorderedList = this.root.querySelector('ul')

            if (!unorderedList) {
                console.error('Unordered list not found')
                return
            }

            let total = 0

            for (const prodInCart of window.app.store.cart) {
                const item = document.createElement('cart-item')
                item.dataset.item = JSON.stringify(prodInCart)
                unorderedList.appendChild(item)
                total += prodInCart.quantity * prodInCart.product.price
            }

            unorderedList.innerHTML += `
                <li>
                    <p class='total'>Total</p>
                    <p class='price-total'>$${total.toFixed(2)}</p>
                </li>
            `
        }
    }
}

customElements.define('order-page', OrderPage)
