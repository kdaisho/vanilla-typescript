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

        window.addEventListener('catalogupdate', () => {
            this.render()
        })
    }

    render() {
        if (window.app.store.catalog) {
            for (const item of window.app.store.catalog) {
                const li = document.createElement('li')
                li.innerHTML = `
                    <h3>${item.name}</h3>       
                    <ul class='category'></ul>
                `
                this.root.querySelector('#catalog')!.appendChild(li)
            }
        } else {
            this.root.querySelector('#catalog')!.innerHTML = 'Loading...'
        }
    }
}

customElements.define('catalog-page', CatalogPage)
