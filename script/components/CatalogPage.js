export class CatalogPage extends HTMLElement {
    constructor() {
        super();
    }
    connectedCallback() {
        const template = document.getElementById('catalog-page-template');
        const content = template.content.cloneNode(true);
        this.appendChild(content);
    }
}
customElements.define('catalog-page', CatalogPage);
