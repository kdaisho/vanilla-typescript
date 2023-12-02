import { addToCart } from '../../services/Order.js'

export default class ProductItem extends HTMLElement {
    constructor() {
        super()
    }

    connectedCallback() {
        const template = document.getElementById(
            'product-item-template'
        ) as HTMLTemplateElement

        this.appendChild(template.content.cloneNode(true))

        const product = JSON.parse(this.dataset.product as string)
        delete this.dataset.product
        const img = this.querySelector('img')
        this.querySelector('h4')!.textContent = product.name
        this.querySelector('p.price')!.textContent =
            '$' + product.price.toFixed(2)
        img!.src = `src/images/products/${product.image}`
        img!.alt = product.name
        this.querySelector('a')!.addEventListener(
            'click',
            async (event: Event) => {
                event.preventDefault()
                const target = event.target as HTMLElement

                if (target.tagName.toLowerCase() === 'button') {
                    await addToCart(product.id)
                } else {
                    window.app.router.go(`/#/product/${product.id}`)
                }
            }
        )
    }
}

customElements.define('product-item', ProductItem)
