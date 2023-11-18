import CatalogPage from './components/catalog-page/CatalogPage'
import DetailsPage from './components/details-page/DetailsPage'
import OrderPage from './components/order-page/OrderPage'

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
        price: number
        description: string
        image: string
    }[]
}[]
