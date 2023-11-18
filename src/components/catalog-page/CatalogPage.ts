import { loadCSS } from '../../utils.js'

export default class CatalogPage extends HTMLElement {
    root: ShadowRoot

    constructor() {
        super()
        this.root = this.attachShadow({ mode: 'open' })

        const style = document.createElement('style')
        this.root.appendChild(style)

        loadCSS(style, 'src/components/catalog-page/catalog-page.css')
    }

    connectedCallback() {
        const template = document.getElementById(
            'catalog-page-template'
        ) as HTMLTemplateElement
        const content = template.content.cloneNode(true)

        this.root.appendChild(content)

        window.addEventListener('catalogupdate', () => {
            this.render()
        })
        this.render()
    }

    render() {
        const catalogElement = this.root.querySelector('#catalog')!
        catalogElement.innerHTML = ''

        if (window.app.store.catalog) {
            for (const category of window.app.store.catalog) {
                const li = document.createElement('li')
                li.innerHTML = `
                    <h3>${category.name}</h3>       
                    <ul class='category'></ul>
                `
                catalogElement.appendChild(li)

                category.products.forEach(product => {
                    const item = document.createElement('product-item')
                    item.dataset.product = JSON.stringify(product)
                    li.querySelector('.category')!.appendChild(item)
                })
            }
        } else {
            catalogElement.innerHTML = 'Loading...'
        }
    }
}

customElements.define('catalog-page', CatalogPage)
