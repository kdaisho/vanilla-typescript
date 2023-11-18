import ProxyStore from './services/Store.js'
import Router from './services/Router.js'
import { loadData } from './services/Catalog.js'
import { CatalogPage } from './components/catalog-page/CatalogPage.js'
import { DetailsPage } from './components/details-page/DetailsPage.js'
import { OrderPage } from './components/order-page/OrderPage.js'
import { App } from './types.js'

window.app = {} as App
window.app.store = ProxyStore
window.app.router = Router
window.app.catalogPage = new CatalogPage()
window.app.detailsPage = new DetailsPage()
window.app.orderPage = new OrderPage()

addEventListener('DOMContentLoaded', () => {
    loadData()
    window.app.router.init()
})
