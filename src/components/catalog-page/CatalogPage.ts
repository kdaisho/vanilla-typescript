import { loadCSS } from '../../utils.js'

export class CatalogPage extends HTMLElement {
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
    }
}

customElements.define('catalog-page', CatalogPage)
