import CatalogPage from './components/catalog-page/CatalogPage.js'
import ProductItem from './components/catalog-page/ProductItem.js'
import DetailsPage from './components/details-page/DetailsPage.js'
import OrderPage from './components/order-page/OrderPage.js'

export interface App {
    store: {
        catalog: null | Catalog
        cart: Record<string, unknown>[]
    }
    catalogPage: CatalogPage
    productItem: ProductItem
    detailsPage: DetailsPage
    orderPage: OrderPage
    router: {
        init: () => void
        go: (route: string, addToHistory?: boolean) => void
    }
}

export type Catalog = {
    name: string
    products: Product[]
}[]

export type Product = {
    id: number
    name: string
    name999: string
    price: number
    description: string
    image: string
}
