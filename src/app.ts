import Store from './services/Store.js'
// import API from './services/API.js'
import Router from './services/Router.js'
import { loadData } from './services/Catalog.js'
import { CatalogPage } from './components/CatalogPage.js'
import { DetailsPage } from './components/DetailsPage.js'
import { OrderPage } from './components/OrderPage.js'

window.app = {}
window.app.store = Store
window.app.router = Router

addEventListener('DOMContentLoaded', () => {
    loadData()
    window.app.router.init()
    console.log(CatalogPage)
    new CatalogPage()
})
