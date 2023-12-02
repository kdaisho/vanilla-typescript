import { getProductById } from '../../services/Catalog.js'
import { addToCart } from '../../services/Order.js'
import type { Product } from '../../types'
import { loadCSS } from '../../utils.js'

export default class DetailsPage extends HTMLElement {
    root: ShadowRoot
    product: Product

    constructor() {
        super()
        this.root = this.attachShadow({ mode: 'open' })
        this.product = {} as Product

        const styles = document.createElement('style')
        this.root.appendChild(styles)
        loadCSS(styles, 'src/components/catalog-page/details-page.css')
    }

    connectedCallback() {
        const template = document.getElementById(
            'details-page-template'
        ) as HTMLTemplateElement
        this.root.appendChild(template.content.cloneNode(true))
        this.render()

        window.addEventListener('cartupdate', () => {
            console.log('CART UPDATED', window.app.store.cart)
        })
    }

    async render() {
        if (this.dataset.id) {
            const currentItem = await getProductById(
                parseInt(this.dataset.id!, 10)
            )

            if (!currentItem) {
                alert('Current product not found')
                return
            } else {
                this.product = currentItem
                this.root.querySelector('h2')!.textContent = this.product.name
                this.root.querySelector(
                    'img'
                )!.src = `/src/images/products/${this.product.image}`
                this.root.querySelector('.description')!.textContent =
                    this.product.description
                this.root.querySelector('.price')!.textContent =
                    '$' + this.product.price.toFixed(2)

                this.root
                    .querySelector('button')!
                    .addEventListener('click', async () => {
                        try {
                            await addToCart(this.product.id)
                            window.app.router.go('/#/order')
                        } catch (error) {
                            if (error instanceof Error) {
                                alert(error.message)
                            }
                        }
                    })
            }
        } else {
            alert('Invalid product ID')
        }
    }
}

customElements.define('details-page', DetailsPage)
