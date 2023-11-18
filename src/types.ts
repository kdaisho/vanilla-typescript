import CatalogPage from './components/catalog-page/CatalogPage.js'
import DetailsPage from './components/details-page/DetailsPage.js'
import OrderPage from './components/order-page/OrderPage.js'

export interface App {
    store: {
        catalog: null | Catalog
        cart: Record<string, unknown>[]
    }
    catalogPage: CatalogPage
    detailsPage: DetailsPage
    orderPage: OrderPage
    router: {
        init: () => void
    }
}

type Catalog = {
    name: string
    products: {
        id: number
        name: string
        name999: string
        price: number
        description: string
        image: string
    }[]
}[]
