import ProxyStore from './services/Store.js';
import Router from './services/Router.js';
import { loadData } from './services/Catalog.js';
import CatalogPage from './components/catalog-page/CatalogPage.js';
import ProductItem from './components/catalog-page/ProductItem.js';
import DetailsPage from './components/details-page/DetailsPage.js';
import OrderPage from './components/order-page/OrderPage.js';
window.app = {};
window.app.store = ProxyStore;
window.app.router = Router;
window.app.catalogPage = new CatalogPage();
window.app.productItem = new ProductItem();
window.app.detailsPage = new DetailsPage();
window.app.orderPage = new OrderPage();
addEventListener('DOMContentLoaded', () => {
    loadData();
    window.app.router.init();
});
addEventListener('appcartchange', () => {
    const badge = document.querySelector('#badge');
    if (!badge) {
        console.error('Badge not found');
        return;
    }
    const quantity = window.app.store.cart.reduce((acc, item) => {
        return acc + item.quantity;
    }, 0);
    badge.textContent = quantity.toString();
    badge.hidden = quantity === 0;
});
